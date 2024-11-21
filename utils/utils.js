const { calcularIdade } = require("./dateUtils");
const { DateTime } = require('luxon');

function nomeValido(nome) {
	return nome.length >= 5;
}

function dataNascimentoValida(dataNascimento) {
    const data = DateTime.fromFormat(dataNascimento, "dd/MM/yyyy");
    if (!data.isValid) {
        return false;
    }
	return true;
}

module.exports = { nomeValido, dataNascimentoValida };