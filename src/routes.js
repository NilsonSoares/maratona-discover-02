// importa o express
const { request, response } = require("express")
const express = require("express")
// pegando o objeto Routes do express para criação de rotas
const routes = express.Router()
// faz a importação do ProfileController
const ProfileController = require("./controllers/ProfileController")
//  faz a importação do JobController
const JobController = require("./controllers/JobController")
// faz a importação do DashboardController
const DashboardController = require('./controllers/DashboardController')


// request, response
/*routes.get('/', (request, response) => {
    // responde com o html na pasta views
    return response.sendFile(basePath + "/index.html")
})
routes.get('/job', (request, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html"))
*/
routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
// rota para capturar dados do formulário pelo método POST
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

/*routes.get("/index.html", (req, res) => {
    return res.redirect('/')
})*/


module.exports = routes