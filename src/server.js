// importando o express
const express = require("express")

// criando o servidor
const server = express()

// importando as rotas
const routes = require("./routes")

const path = require("path")

// configura o motor de visualização do html para o ejs
server.set('view engine', 'ejs')

// mudar a localização da pasta views
// indica que a pasta views está dentro de src
server.set('views', path.join(__dirname, 'views'))

// criando a rota para os arquivos públicos
// habilita os arquivos estáticos
server.use(express.static("public"))

// usar o request.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

// inicia o servidor na porta 3000
server.listen(3000, () => console.log('rodando'))