const { DateTime } = require('luxon');
const { pacientes, agendamentos } = require('../data/dataStore');
const Agendamento = require('../models/Agendamento');
const { horaValida } = require('../utils/dateUtils');
const prompt = require('../utils/prompt');
const { dataFormatoValido } = require('../utils/utils');

function agendarConsulta() {
	while (true) {
		let cpf;
		let dataConsulta;
		let horaInicial;
		let horaFinal;
		let paciente;

		while (true) {
			cpf = prompt("CPF do paciente: ");
			paciente = pacientes.find(p => p.cpf() === cpf);

			if (!paciente) {
				console.log("Paciente não encontrado.");
				continue;
			}

			break;
		}

		while (true) {
			dataConsulta = prompt("Data da consulta (DD/MM/AAAA): ");

			if (dataFormatoValido(dataConsulta) == false) {
				console.log("Data inválida. Digite novamente.");
				continue;
			}

			break;
		}

		while (true) {
			horaInicial = prompt("Hora inicial (HHMM): ");

			if (!horaValida(horaInicial)) {
				console.log("Horário inválido. Horários devem ser múltiplos de 15 minutos.");
				continue;
			}

			break;
		}

		while (true) {
			horaFinal = prompt("Hora final (HHMM): ");

			if (!horaValida(horaFinal)) {
				console.log("Horário inválido. Horários devem ser múltiplos de 15 minutos.");
				continue;
			}

			break;
		}

		const agendamento = new Agendamento(dataConsulta, horaInicial, horaFinal, paciente);

		if (!agendamento.valido()) {
			console.log("Erro no agendamento. Horários inválidos ou fora do expediente.");
			continue;
		}

		const agora = DateTime.now();
		const inicioAgendamento = DateTime.fromFormat(`${dataConsulta} ${horaInicial}`, "dd/MM/yyyy HHmm");

		if (inicioAgendamento <= agora) {
			console.log("Erro: a consulta deve ser agendada para o futuro.");
			continue;
		}

		const temAgendamentoFuturo = agendamentos.some(
			a => a.paciente().cpf() === cpf && DateTime.fromFormat(a.dataConsulta(), "dd/MM/yyyy") >= agora
		);

		if (temAgendamentoFuturo) {
			console.log("Erro: paciente já possui um agendamento futuro.");
			continue;
		}

		if (agendamentos.some(a => a.conflito(agendamento))) {
			console.log("Erro: conflito com outro agendamento.");
			continue;
		}

		agendamentos.push(agendamento);
		console.log("Consulta agendada com sucesso!");
		break;
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
