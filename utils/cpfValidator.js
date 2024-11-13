function validarCPF(cpf) {
    return cpf.length === 11 && !/^(\d)\1+$/.test(cpf);
}

module.exports = validarCPF;
