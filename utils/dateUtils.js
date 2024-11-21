const { DateTime } = require('luxon');

function calcularIdade(dataNascimento) {
    const data = DateTime.fromFormat(dataNascimento, "dd/MM/yyyy");
    return DateTime.now().diff(data, 'years').years;
}

function validarHorario(dataConsulta, horaInicial, horaFinal) {
    const inicio = DateTime.fromFormat(`${dataConsulta} ${horaInicial}`, "dd/MM/yyyy HHmm");
    const fim = DateTime.fromFormat(`${dataConsulta} ${horaFinal}`, "dd/MM/yyyy HHmm");

    return (
        inicio < fim &&
        inicio.hour >= 8 && fim.hour <= 19
    );
}

function horaValida(hora) {
    const match = hora.match(/^([01]\d|2[0-3])[0-5]\d$/);
    if (!match) return false;

    const minutos = parseInt(hora.slice(-2), 10);
    return minutos % 15 === 0;
}

module.exports = { calcularIdade, validarHorario, horaValida };
