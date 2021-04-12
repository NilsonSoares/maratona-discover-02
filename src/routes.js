// importa o express
const { request, response } = require("express")
const express = require("express")
// pegando o objeto Routes do express
const routes = express.Router()

const basePath = __dirname + "/views"

// request, response
routes.get('/', (request, response) => {
    // responde com o html na pasta views
    return response.sendFile(basePath + "/index.html")
})

routes.get('/job', (request, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html"))

/*routes.get("/index.html", (req, res) => {
    return res.redirect('/')
})*/

module.exports = routes