const { exibirMenuPrincipal } = require('./views/menus.js');
const prompt = require('./utils/prompt');

function main() {
	let opcao;
	do {
		opcao = exibirMenuPrincipal();
		switch (opcao) {
			case '1':
				require('./controllers/PacienteController.js').menuCadastroPaciente();
				break;
			case '2':
				require('./controllers/AgendaController.js').menuAgenda();
				break;
			case '3':
				console.log("Saindo...");
				break;
			default:
				console.log("Opção inválida.");
		}
	} while (opcao !== '3');
}

main();
