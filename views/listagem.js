const { DateTime } = require('luxon');
var Table = require('cli-tableau');

function listarPacientes(pacientes, ordemAlfabetica = false) {
	var table = new Table({
		head: ['CPF', 'Nome', 'Dt.Nasc.', 'Idade'],
	});

	if (ordemAlfabetica) {
		pacientes.sort((a, b) => a.nome().localeCompare(b.nome()));
	} else {
		pacientes.sort((a, b) => a.cpf().localeCompare(b.cpf()));
	}

	pacientes.forEach(paciente => {

		table.push(
			[paciente.cpf(), paciente.nome(), paciente.dataNascimento(), Math.floor(DateTime.now().diff(DateTime.fromFormat(paciente.dataNascimento(), 'dd/MM/yyyy'), 'years').years)]
		);

	});
	console.log(table.toString());
}

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
