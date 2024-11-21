class Paciente {
	#cpf;
	#nome;
	#dataNascimento;

	constructor(cpf, nome, dataNascimento) {
		this.#cpf = cpf;
		this.#nome = nome;
		this.#dataNascimento = dataNascimento;
	}

	toString() {
		return `CPF: ${this.#cpf}, Nome: ${this.#nome}, Data de Nasc.: ${this.#dataNascimento}`;
	}

	cpf() {
		return this.#cpf;
	}

	nome() {
		return this.#nome;
	}

	dataNascimento() {
		return this.#dataNascimento;
	}
}

module.exports = Paciente;
