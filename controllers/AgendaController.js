const { DateTime } = require('luxon');
const { pacientes, agendamentos } = require('../data/dataStore');
const Agendamento = require('../models/Agendamento');
const { horaValida } = require('../utils/dateUtils');
const prompt = require('../utils/prompt');
const { dataFormatoValido } = require('../utils/utils');
const { exibirMenuAgenda } = require('../views/menus');
const { listarAgenda } = require('../views/listagem');

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
				console.log("Erro: paciente não encontrado.");
				continue;
			}

			break;
		}

		while (true) {
			dataConsulta = prompt("Data da consulta (DD/MM/AAAA): ");

			if (dataFormatoValido(dataConsulta) == false) {
				console.log("Erro: data inválida. Digite novamente.");
				continue;
			}

			break;
		}

		while (true) {
			horaInicial = prompt("Hora inicial (HHMM): ");

			if (!horaValida(horaInicial)) {
				console.log("Erro: horário inválido. Horários devem ser múltiplos de 15 minutos.");
				continue;
			}

			break;
		}

		while (true) {
			horaFinal = prompt("Hora final (HHMM): ");

			if (!horaValida(horaFinal)) {
				console.log("Erro: horário inválido. Horários devem ser múltiplos de 15 minutos.");
				continue;
			}

			break;
		}

		const agendamento = new Agendamento(dataConsulta, horaInicial, horaFinal, paciente);

		if (!agendamento.valido()) {
			console.log("Erro: horários inválidos ou fora do expediente.");
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

function excluirAgendamento() {
	let cpf;
	let paciente;
	let dataConsulta;
	let horaInicial;

	while (true) {
		cpf = prompt("CPF do paciente: ");
		paciente = pacientes.find(p => p.cpf() === cpf);

		if (!paciente) {
			console.log("Erro: paciente não encontrado.");
			continue;
		}

		break;
	}

	while (true) {
		dataConsulta = prompt("Data da consulta (DD/MM/AAAA): ");

		if (dataFormatoValido(dataConsulta) == false) {
			console.log("Erro: data inválida. Digite novamente.");
			continue;
		}

		break;
	}

	while (true) {
		horaInicial = prompt("Hora inicial (HHMM): ");

		if (!horaValida(horaInicial)) {
			console.log("Erro: horário inválido. Horários devem ser múltiplos de 15 minutos.");
			continue;
		}

		break;
	}
	const agendamento = agendamentos.find((a) =>
		a.paciente().cpf() === cpf && a.dataConsulta() == dataConsulta && a.horaInicial() == horaInicial
	);

	if (!agendamento) {
		console.log('Erro: agendamento não encontrado');
	} else {
		const agora = DateTime.now();
		const inicioAgendamento = DateTime.fromFormat(`${dataConsulta} ${horaInicial}`, "dd/MM/yyyy HHmm");

		if (inicioAgendamento <= agora) {
			console.log("Erro: você só pode cancelar agendamentos futuros.");
		} else {
			const index = agendamentos.findIndex((a) => { a.paciente().cpf() === cpf && a.dataConsulta() == dataConsulta && a.horaInicial() == horaInicial });
			agendamentos.splice(index, 1);

			console.log("Agendamento cancelado com sucesso.");
		}
	}
}

function menuAgenda() {
	let opcao;
	do {
		opcao = exibirMenuAgenda();
		switch (opcao) {
			case '1':
				agendarConsulta();
				break;
			case '2':
				excluirAgendamento();
				break;
			case '3':
				listarAgenda(agendamentos);
				break;
		}
	} while (opcao !== '4');
}

module.exports = { menuAgenda, agendamentos };
