const xl = require("excel4node");
const readline = require("readline");

// Cria uma interface para entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Inicializa os arrays com valores padrão
let data = [
    {
        "name": "test",
        "email": "teste@gmail.com",
        "cellphone": "12456789"
    },
    {
        "name": "Pessoa",
        "email": "pessoa@gmail.com",
        "cellphone": "1235456789"
    }
];

let titulos = ["Nome", "E-mail", "Celular"];

// Função para personalizar os arrays
function editarArrays() {
    rl.question("Deseja editar os títulos? (sim/não): ", (res) => {
        if (res.toLowerCase() === "sim") {
            rl.question("Digite os novos títulos separados por vírgula: ", (novosTitulos) => {
                titulos = novosTitulos.split(",").map(t => t.trim());
                editarRegistros();
            });
        } else {
            editarRegistros();
        }
    });
}

// Função para personalizar os registros
function editarRegistros() {
    rl.question("Deseja editar os registros? (sim/não): ", (res) => {
        if (res.toLowerCase() === "sim") {
            data = []; // Zera os registros anteriores
            console.log("Adicione os registros. Para finalizar, digite 'sair'.");
            adicionarRegistro();
        } else {
            gerarExcel();
        }
    });
}

// Função para adicionar registros um por um
function adicionarRegistro() {
    rl.question("Digite os valores para um registro (ex.: Nome,E-mail,Celular): ", (res) => {
        if (res.toLowerCase() === "sair") {
            gerarExcel();
        } else {
            const valores = res.split(",").map(v => v.trim());
            const registro = {};
            titulos.forEach((titulo, i) => {
                registro[titulo.toLowerCase()] = valores[i] || "";
            });
            data.push(registro);
            adicionarRegistro();
        }
    });
}

// Função para gerar o arquivo Excel
function gerarExcel() {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Planilha Personalizada");

    // Adiciona os títulos na primeira linha
    let titulosIndex = 1;
    titulos.forEach(heading => {
        ws.cell(1, titulosIndex++).string(heading);
    });

    // Adiciona os registros a partir da segunda linha
    let rowIndex = 2;
    data.forEach(record => {
        let columnIndex = 1;
        Object.values(record).forEach(value => {
            ws.cell(rowIndex, columnIndex++).string(value);
        });
        rowIndex++;
    });

    // Salva o arquivo
    wb.write("arquivo_personalizado.xlsx", () => {
        console.log("Arquivo Excel gerado com sucesso: arquivo_personalizado.xlsx");
        rl.close();
    });
}

// Inicia o processo
editarArrays();
