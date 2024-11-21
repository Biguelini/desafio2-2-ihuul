const Paciente = require('../models/Paciente');
const pacientes = [];
const prompt = require('../utils/prompt');
const cpfValidator = require('../utils/cpfValidator');
const { exibirMenuCadastroPaciente } = require('../views/menus');
const { dataNascimentoValida, nomeValido } = require('../utils/utils');
const { calcularIdade } = require('../utils/dateUtils');
const { listarPacientes } = require('../views/listagem');

function adicionarPaciente() {

	let cpf;
	let nome;
	let dataNascimento;
	while (true) {
		cpf = prompt("CPF: ").replace(/\D/g, "");
		if (!cpfValidator(cpf)) {
			console.log("CPF inválido. Digite novamente.");
			continue;
		}
		if (pacientes.some(p => p.cpf === cpf)) {
			console.log("CPF duplicado. Digite novamente.");
			continue;
		}
		break;
	}

	while (true) {
		nome = prompt("Nome: ");
		if (!nomeValido(nome)) {
			console.log("Nome inválido. Digite novamente.");
			continue;
		}
		break;
	}

	while (true) {
		dataNascimento = prompt("Data de nascimento (DD/MM/AAAA): ");
		if (dataNascimentoValida(dataNascimento) == false) {
			console.log("Data de nascimento inválida. Digite novamente.");
			continue;
		}

		if (calcularIdade(dataNascimento) < 13) {
			console.log("O dentista só atende pacientes com 13 anos ou mais. Verifique a data de nascimento.");
			continue;
		}
		break;
	}

	const paciente = new Paciente(cpf, nome, dataNascimento);

	pacientes.push(paciente);
	console.log("Paciente cadastrado com sucesso!");
}

function excluirPaciente() {
	const cpf = prompt("CPF do paciente a ser excluído: ");
	const index = pacientes.findIndex(p => p.cpf() === cpf);
	if (index !== -1) {
		pacientes.splice(index, 1);
		console.log("Paciente excluído com sucesso.");
	} else {
		console.log("Paciente não encontrado.");
	}
}

function menuCadastroPaciente() {
	let opcao;
	do {
		opcao = exibirMenuCadastroPaciente();
		switch (opcao) {
			case '1':
				adicionarPaciente(pacientes);
				break;
			case '2':
				excluirPaciente();
				break;
			case '3':
				listarPacientes(pacientes);
				break;
			case '4':
				listarPacientes(pacientes, true);
				break;
		}
	} while (opcao !== '5');
}

module.exports = { menuCadastroPaciente, pacientes };
