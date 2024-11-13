const Paciente = require('../models/Paciente');
const pacientes = [];
const prompt = require('../utils/prompt');
const cpfValidator = require('../utils/cpfValidator');

function adicionarPaciente() {
    const cpf = prompt("CPF: ");
    if (!cpfValidator(cpf)) {
        console.log("CPF inválido.");
        return;
    }
    const nome = prompt("Nome: ");
    const dataNascimento = prompt("Data de nascimento (DD/MM/AAAA): ");
    const paciente = new Paciente(cpf, nome, dataNascimento);
    if (paciente.valido() && !pacientes.some(p => p.cpf === cpf)) {
        pacientes.push(paciente);
        console.log("Paciente cadastrado com sucesso!");
    } else {
        console.log("Erro no cadastro do paciente.");
    }
}

function excluirPaciente() {
    const cpf = prompt("CPF do paciente a ser excluído: ");
    const index = pacientes.findIndex(p => p.cpf === cpf);
    if (index !== -1) {
        pacientes.splice(index, 1);
        console.log("Paciente excluído com sucesso.");
    } else {
        console.log("Paciente não encontrado.");
    }
}

function listarPacientes() {
    console.log("Lista de Pacientes:");
    pacientes.forEach(p => console.log(p.toString()));
}

function menuCadastroPaciente() {
    let opcao;
    do {
        opcao = prompt("1-Cadastrar, 2-Excluir, 3-Listar, 4-Voltar: ");
        switch (opcao) {
            case '1':
                adicionarPaciente();
                break;
            case '2':
                excluirPaciente();
                break;
            case '3':
                listarPacientes();
                break;
        }
    } while (opcao !== '4');
}

module.exports = { menuCadastroPaciente };
