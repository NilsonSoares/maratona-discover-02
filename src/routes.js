// importa o express
const { request, response } = require("express")
const express = require("express")
// pegando o objeto Routes do express para criação de rotas
const routes = express.Router()

//const basePath = __dirname + "/views"
const views = __dirname + "/views/"

const Profile = {
    data: {
        name: "Nilson",
        avatar: "https://www.github.com/NilsonSoares.png",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(request, response) {
            response.render(views + "profile", { profile: Profile.data })
        },
        update(request, response) {

            // req.body para pegar os dados
            const data = request.body
            // definor quantas semanas tem num ano
            const weeksPerYeear = 52
            // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
            const weeksPerMonth = (weeksPerYeear - data["vacation-per-year"]) / 12
            // total de horas trabalhadas na semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            // total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            // qual será o valor da minha hora?
            valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...request.body,
                "value-hour": valueHour
            }
            return response.redirect('/profile')
        }
    }

}

const Job = {
    // Lista de jobs
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            Created_at: Date.now(),// atribuindo data atual
            budget: 4500
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            Created_at: Date.now(),// atribuindo data atual
        },
        {
            id: 3,
            name: "SGA",
            "daily-hours": 3,
            "total-hours": 100,
            Created_at: Date.now(),// atribuindo data atual
            budget: 4500
        }
    ],
    controllers: {
        index(request, response) {
            // perrmite iterar sobre um array retornando o elemento
            const updatedJobs = Job.data.map((job) => {
                // ajuustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job, //espalhamento
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })

            return response.render(views + "index", { jobs: updatedJobs })
        },
        create(request, response) {
            response.render(views + "job")
        },
        save(request, response) {
            //console.log("Salvar Dados.")
            //console.log(request.body)

            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                Created_at: Date.now()// atribuindo data atual
            })

            // redirciona para a página inicial
            return response.redirect('/')

        },
        show(request, response) {
            // pega o id passado no parâmetro da URL
            const jobId = request.params.id
            // retorna o objeto job cujo id é igual ao jobId
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return response.send("Job not found!")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return response.render(views + "job-edit", { job })
        },
        update(request, response) {
            // pega o id passado no parâmetro da URL
            const jobId = request.params.id
            // retorna o objeto job cujo id é igual ao jobId
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return response.send("Job not found!")
            }

            // espalha os dados do job e sobrescreve as informações com os dados enviados pelo formulario
            const updatedJob = {
                ...job,
                name: request.body.name,
                "total-hours": request.body["total-hours"],
                "daily-hours": request.body["daily-hours"]
            }
            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)) {
                    job = updatedJob
                } 

                return job
            })
            response.redirect('/job/' + jobId)
        },
        delete(request, response) {
            // pega o id passado no parâmetro da URL
            const jobId = request.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return response.redirect('/')
        }
    },
    services: {
        remainingDays(job) {
            // cálculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

            const createdDate = new Date(job.Created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)

            const timeDiffInMS = dueDateInMs - Date.now()
            // transformar ms em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMS / dayInMs)


            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
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
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
// rota para capturar dados do formulário pelo método POST
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

/*routes.get("/index.html", (req, res) => {
    return res.redirect('/')
})*/


module.exports = routes