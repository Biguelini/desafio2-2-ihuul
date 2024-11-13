const prompt = require('../utils/prompt');

// Exibe o menu principal e retorna a opção escolhida
function exibirMenuPrincipal() {
    console.log("\nMenu Principal:");
    console.log("1 - Cadastro de pacientes");
    console.log("2 - Agenda");
    console.log("3 - Fim");

    const opcao = prompt("Escolha uma opção: ");
    return opcao;
}

// Exibe o menu de cadastro de pacientes e retorna a opção escolhida
function exibirMenuCadastroPaciente() {
    console.log("\nMenu do Cadastro de Pacientes:");
    console.log("1 - Cadastrar novo paciente");
    console.log("2 - Excluir paciente");
    console.log("3 - Listar pacientes (ordenado por CPF)");
    console.log("4 - Listar pacientes (ordenado por nome)");
    console.log("5 - Voltar para o menu principal");

    const opcao = prompt("Escolha uma opção: ");
    return opcao;
}

// Exibe o menu da agenda e retorna a opção escolhida
function exibirMenuAgenda() {
    console.log("\nMenu da Agenda:");
    console.log("1 - Agendar consulta");
    console.log("2 - Cancelar agendamento");
    console.log("3 - Listar agenda");
    console.log("4 - Voltar para o menu principal");

    const opcao = prompt("Escolha uma opção: ");
    return opcao;
}

module.exports = { exibirMenuPrincipal, exibirMenuCadastroPaciente, exibirMenuAgenda };
