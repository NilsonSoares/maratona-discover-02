// importa o express
const { request, response } = require("express")
const express = require("express")
// pegando o objeto Routes do express para criação de rotas
const routes = express.Router()

//const basePath = __dirname + "/views"
const views = __dirname + "/views/"

const profile = {
    name: "Nilson",
    avatar: "",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
}

// request, response
/*routes.get('/', (request, response) => {
    // responde com o html na pasta views
    return response.sendFile(basePath + "/index.html")
})

routes.get('/job', (request, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html"))
*/
routes.get('/', (request, response) => response.render(views + "index"))
routes.get('/job', (request, response) => response.render(views + "job"))
routes.get('/job/edit', (request, response) => response.render(views + "job-edit"))
routes.get('/profile', (request, response) => response.render(views + "profile", {profile: profile}))

/*routes.get("/index.html", (req, res) => {
    return res.redirect('/')
})*/


module.exports = routes