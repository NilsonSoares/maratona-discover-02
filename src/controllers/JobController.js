const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(request, response) {
        response.render("job")
    },
    save(request, response) {
        const jobs = Job.get()

        const lastId = jobs[jobs.length - 1]?.id || 0;

        jobs.push({
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
        const jobs = Job.get()
        // pega o id passado no parâmetro da URL
        const jobId = request.params.id
        // retorna o objeto job cujo id é igual ao jobId
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return response.send("Job not found!")
        }

        const profile = Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return response.render("job-edit", { job })
    },
    update(request, response) {
        jobs = Job.get()
        // pega o id passado no parâmetro da URL
        const jobId = request.params.id
        // retorna o objeto job cujo id é igual ao jobId
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return response.send("Job not found!")
        }

        // espalha os dados do job e sobrescreve as informações com os dados enviados pelo formulario
        const updatedJob = {
            ...job,
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"]
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        Job.update(newJobs)

        response.redirect('/job/' + jobId)
    },
    delete(request, response) {
        // pega o id passado no parâmetro da URL
        const jobId = request.params.id

        Job.delete(jobId)

        return response.redirect('/')
    }
}