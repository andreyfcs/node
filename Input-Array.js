// Readline usando Array's e editando
const { stdin } = require('process');
const readline = require ('readline');

//criar entrada de dados
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

//array de exemplo
let meuArray = ['Item 1', 'Item2', 'Item 3'];

//função para mostrar o array atual e pedir edição
function editarArray() {
    //mostrar ARRAY atual
    console.log('Array atual:');
    console.log(meuArray);

    rl.question("Escolha o indice do item para editar (0,1,2...): ", (indice) =>{
        indice = parseInt(indice); //Converter para numero inteiro
        
        // Verifica se o índice está dentro dos limites do array
        if(indice >= 0 && indice < meuArray.length) {
            rl.question('Digite o novo valor para o item: ', (novoValor) => {
                //Editar o item no array
                meuArray[indice] = novoValor;

                console.log('Array atualizado');
                console.log(meuArray);

                rl.close(); //Fechar a interface readline
            }); 
        } else { 
            console.log('Indice invalido. Tente novamente. ');
            editarArray(); //Chama a funcao novamente caso o indice seja invalido
        }
    });
}

//chamar a função para iniciar o processo

editarArray();