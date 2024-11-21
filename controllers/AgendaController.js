const { pacientes, agendamentos } = require('../data/dataStore');
const Agendamento = require('../models/Agendamento');
const prompt = require('../utils/prompt');
const { validarDataHora } = require('../utils/dateUtils');

function agendarConsulta() {
    const cpf = prompt("CPF do paciente: ");
	pacientes.map((paciente)=>{
		console.log(paciente.toString())
	})
	
    const paciente = pacientes.find(p => p.cpf() === cpf);
    if (!paciente) return console.log("Paciente não encontrado.");
    
    const dataConsulta = prompt("Data da consulta (DD/MM/AAAA): ");
    const horaInicial = prompt("Hora inicial (HHMM): ");
    const horaFinal = prompt("Hora final (HHMM): ");

    const agendamento = new Agendamento(dataConsulta, horaInicial, horaFinal, paciente);
    if (agendamento.valido() && !agendamentos.some(a => a.conflito(agendamento))) {
        agendamentos.push(agendamento);
        console.log("Consulta agendada com sucesso!");
    } else {
        console.log("Erro no agendamento.");
    }
}

function listarAgenda() {
    console.log("Agenda:");
    agendamentos.forEach(a => console.log(a.toString()));
}

function menuAgenda() {
    let opcao;
    do {
        opcao = prompt("1-Agendar, 2-Listar, 3-Voltar: ");
        switch (opcao) {
            case '1':
                agendarConsulta();
                break;
            case '2':
                listarAgenda();
                break;
        }
    } while (opcao !== '3');
}

module.exports = { menuAgenda, agendamentos };
