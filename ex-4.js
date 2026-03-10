const fs = require('fs');
const path = require('path');

// Configuração de caminhos
const pastaDados = path.join(__dirname, 'dados');
const caminhoArquivo = path.join(pastaDados, 'produtos.json');

// 1. Estrutura Inicial: Criar pasta se não existir
if (!fs.existsSync(pastaDados)) {
    fs.mkdirSync(pastaDados);
    console.log("Pasta 'dados' criada com sucesso.");
}

// 2. Cadastro Inicial de Produtos
const produtosIniciais = [
    { id: 1, produto: "Teclado Mecânico", preco: 250.00 },
    { id: 2, produto: "Mouse Gamer", preco: 120.00 }
];

function inicializarArquivo() {
    const json = JSON.stringify(produtosIniciais, null, 2);
    fs.writeFileSync(caminhoArquivo, json, 'utf-8');
    console.log("Arquivo inicial criado.");
}

// 3. Leitura de Dados (Síncrona)
function listarProdutos() {
    try {
        const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
        const produtos = JSON.parse(dados);
        console.log("\n--- Catálogo de Produtos ---");
        produtos.forEach(p => console.log(`[${p.id}] ${p.produto} - R$ ${p.preco.toFixed(2)}`));
    } catch (erro) {
        console.error("Erro ao ler produtos:", erro.message);
    }
}

// 4. Atualização do Catálogo (Adicionar novo)
function adicionarProduto(novoProduto) {
    try {
        const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
        const produtos = JSON.parse(dados);
        produtos.push(novoProduto);
        fs.writeFileSync(caminhoArquivo, JSON.stringify(produtos, null, 2));
        console.log(`\nProduto "${novoProduto.produto}" adicionado!`);
    } catch (erro) {
        console.error("Erro ao atualizar catálogo:", erro.message);
    }
}

// 5. Operações Assíncronas (Demonstração)
function leituraAssincrona() {
    console.log("\n[Assíncrono] Iniciando leitura...");
    fs.readFile(caminhoArquivo, 'utf-8', (err, data) => {
        if (err) return;
        console.log("[Assíncrono] Conteúdo lido com sucesso!");
    });
    console.log("[Assíncrono] Esta mensagem aparece ANTES da leitura terminar (não-bloqueante).");
}

// 6. Funcionalidade de Busca por ID
function buscarProdutoPorId(id) {
    try {
        const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
        const produtos = JSON.parse(dados);
        const resultado = produtos.find(p => p.id === id);
        return resultado || null;
    } catch (erro) {
        console.error("Erro na busca:", erro.message);
        return null;
    }
}

// --- Execução do Fluxo ---

inicializarArquivo();
adicionarProduto({ id: 5, produto: "TV'", preco: 20.00 });
listarProdutos();

const busca = buscarProdutoPorId(2);
console.log("\nResultado da busca ID 2:", busca);

leituraAssincrona();

// Chamamos a listagem de novo para ver o resultado no terminal
listarProdutos();


