// importando o express
const express = require("express")

// criando o servidor
const server = express()

// importando as rotas
const routes = require("./routes")

// configura o motor de visualização do html para o ejs
server.set('view engine', 'ejs')

// criando a rota para os arquivos públicos
// habilita os arquivos estáticos
server.use(express.static("public"))

// usar o request.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

// inicia o servidor na porta 3000
server.listen(3000, () => console.log('rodando'))