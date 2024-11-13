const { DateTime } = require('luxon');

// Listagem de pacientes com agendamentos futuros
function listarPacientes(pacientes, agendamentos) {
    console.log("------------------------------------------------------------");
    console.log("CPF            Nome                         Dt.Nasc.  Idade");
    console.log("------------------------------------------------------------");

    pacientes.forEach(paciente => {
        const idade = DateTime.now().diff(DateTime.fromFormat(paciente.dataNascimento, 'dd/MM/yyyy'), 'years').years;
        console.log(`${paciente.cpf.padEnd(14)} ${paciente.nome.padEnd(28)} ${paciente.dataNascimento} ${Math.floor(idade)}`);

        // Verificar se há um agendamento futuro para o paciente
        const agendamentoFuturo = agendamentos.find(ag => ag.paciente.cpf === paciente.cpf && ag.dataConsulta >= DateTime.now().toISODate());
        if (agendamentoFuturo) {
            console.log(`  Agendado para: ${agendamentoFuturo.dataConsulta} de ${agendamentoFuturo.horaInicial} às ${agendamentoFuturo.horaFinal}`);
        }
    });

    console.log("------------------------------------------------------------");
}

// Listagem da agenda com filtro de período (opcional)
function listarAgenda(agendamentos, dataInicio = null, dataFim = null) {
    console.log("-------------------------------------------------------------");
    console.log("Data        H.Ini  H.Fim  Tempo   Nome                  Dt.Nasc.");
    console.log("-------------------------------------------------------------");

    agendamentos
        .filter(ag => {
            const dataConsulta = DateTime.fromFormat(ag.dataConsulta, 'dd/MM/yyyy');
            const inicio = dataInicio ? DateTime.fromFormat(dataInicio, 'dd/MM/yyyy') : null;
            const fim = dataFim ? DateTime.fromFormat(dataFim, 'dd/MM/yyyy') : null;
            return (!inicio || dataConsulta >= inicio) && (!fim || dataConsulta <= fim);
        })
        .sort((a, b) => {
            const dataA = DateTime.fromFormat(a.dataConsulta + a.horaInicial, 'dd/MM/yyyyHHmm');
            const dataB = DateTime.fromFormat(b.dataConsulta + b.horaInicial, 'dd/MM/yyyyHHmm');
            return dataA - dataB;
        })
        .forEach(ag => {
            const tempo = DateTime.fromFormat(ag.horaFinal, 'HHmm').diff(DateTime.fromFormat(ag.horaInicial, 'HHmm'), 'minutes').toObject().minutes;
            console.log(`${ag.dataConsulta}  ${ag.horaInicial}  ${ag.horaFinal}  ${tempo.toFixed(0)} mins   ${ag.paciente.nome.padEnd(20)}  ${ag.paciente.dataNascimento}`);
        });

    console.log("-------------------------------------------------------------");
}

module.exports = { listarPacientes, listarAgenda };
