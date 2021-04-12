// importando o express
const express = require("express")

// criando o servidor
const server = express()

// importando as rotas
const routes = require("./routes")

// criando a rota para os arquivos públicos
// habilita os arquivos estáticos
server.use(express.static("public"))

// routes
server.use(routes)

// inicia o servidor na porta 3000
server.listen(3000, () => console.log('rodando'))