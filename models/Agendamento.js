const { validarHorario } = require('../utils/dateUtils');

class Agendamento {
	#dataConsulta;
	#horaInicial;
	#horaFinal;
	#paciente;

    constructor(dataConsulta, horaInicial, horaFinal, paciente) {
        this.#dataConsulta = dataConsulta;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#paciente = paciente;
    }

    valido() {
        return validarHorario(this.#dataConsulta, this.#horaInicial, this.#horaFinal);
    }

    conflito(outro) {
        return this.#dataConsulta === outro.dataConsulta &&
            ((this.#horaInicial >= outro.horaInicial && this.#horaInicial < outro.horaFinal) ||
             (outro.horaInicial >= this.#horaInicial && outro.horaInicial < this.#horaFinal));
    }

    toString() {
        return `${this.#dataConsulta} ${this.#horaInicial} - ${this.#horaFinal} Paciente: ${this.#paciente.nome}`;
    }
}

module.exports = Agendamento;
