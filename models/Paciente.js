const { calcularIdade } = require('../utils/dateUtils');

class Paciente {
	#cpf;
	#nome;
	#dataNascimento;

	constructor(cpf, nome, dataNascimento) {
		this.#cpf = cpf;
		this.#nome = nome;
		this.#dataNascimento = dataNascimento;
	}

	valido() {
		return this.#nome.length >= 5 && calcularIdade(this.#dataNascimento) >= 13;
	}

	toString() {
		return `CPF: ${this.#cpf}, Nome: ${this.#nome}, Data de Nasc.: ${this.#dataNascimento}`;
	}
}

module.exports = Paciente;
