// Readline, modulo para receber entrada do usuario
//importando o modulo readline
const readline = require("readline");

//criando a interface readline
const rl = readline.createInterface({
    input:process.stdin, //entrada padrão (teclado)
    output:process.stdout //saida padrão (console)
});

//fazendo uma pergunta ao usuário
rl.question('qual é o seu nome? ', (nome) => {
    //respondendo com base na entrada
    console.log(`Olá, ${nome}`);

    //fechando a interface após a resposta
    rl.close();
});