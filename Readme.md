# Sobre
Esse projeto foi desenvolvido para a residência na ihuul.

# Funcionalidades
## Pacientes
Cadastro
Listagem
Exclusão

## Agendamentos
Cadastro
Listagem
Exclusão

# Estrutura do projeto
controllers: Pasta onde ficam todos os controllers (lógica) do projeto
 - AgendaController.js: Lógica da agenda
 - PacienteController.js: Lógica do paciente

data: Pasta onde fica a parte de persistência de dados
 - dataStore.js: Arquivo que utilizei como banco de dados, para manter os agendamentos e pacientes centralizados

models: Pasta onde ficam as classes do projeto
 - Agendamento.js: Model do agendamento, implementado utilizando encapsulamento
 - Paciente.js: Model do paciente, implementado utilizando encapsulamento

utils: Pasta utilizada para centralizar algumas funções que são utilizadas como apoio em várias partes do código
 - prompt.js: Utilizei esse arquivo para criar uma instância do prompt-sync e ficar mais fácil de utilizar ele no código
 - utils.js: Nesse arquivo tenho algumas funções de validação que são utilizadas em várias partes do código

views: Pasta utilizada para centralizar as funções de exibição mais complexas
 - listagem.js: Arquivo utilizado para criar as listagens de pacientes e agendamentos
 - menus.js: Arquivo utilizado para criar os menus do projeto

index.js: Arquivo raiz do projeto

# Preview
![](https://github.com/Biguelini/desafio2-2-ihuul/blob/main/preview/Captura%20de%20tela%202024-11-21%20121421.png) <br/>
![](https://github.com/Biguelini/desafio2-2-ihuul/blob/main/preview/Captura%20de%20tela%202024-11-21%20121427.png) <br/>
![](https://github.com/Biguelini/desafio2-2-ihuul/blob/main/preview/Captura%20de%20tela%202024-11-21%20121434.png) <br/>
![](https://github.com/Biguelini/desafio2-2-ihuul/blob/main/preview/Captura%20de%20tela%202024-11-21%20121504.png) <br/>
![](https://github.com/Biguelini/desafio2-2-ihuul/blob/main/preview/Captura%20de%20tela%202024-11-21%20121530.png)
