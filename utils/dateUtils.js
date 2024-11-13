const { DateTime } = require('luxon');

function calcularIdade(dataNascimento) {
    const data = DateTime.fromFormat(dataNascimento, "dd/MM/yyyy");
    return DateTime.now().diff(data, 'years').years;
}

function validarHorario(dataConsulta, horaInicial, horaFinal) {
    const inicio = DateTime.fromFormat(`${dataConsulta} ${horaInicial}`, "dd/MM/yyyy HHmm");
    const fim = DateTime.fromFormat(`${dataConsulta} ${horaFinal}`, "dd/MM/yyyy HHmm");
    return inicio < fim && inicio.hour >= 8 && fim.hour <= 19;
}

module.exports = { calcularIdade, validarHorario };
