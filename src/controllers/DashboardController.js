const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(request, response) { // a função index se torna async pois Profile.get() é await
        const jobs = await Job.get()
        const profile = await Profile.get() // await pois Profile.get() é async

        const statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // somatório de horas por dia de cada job em progresso
        let jobTotalHours = 0;
        // perrmite iterar sobre um array retornando o elemento
        const updatedJobs = jobs.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            // incrementando o contador de acordo com o status
            statusCount[status]++

            jobTotalHours = (status === 'progress') ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job, //espalhamento
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // quantidade de horas que quero trabalahr 
        // MENOS
        // a quantidade de horas/dia de cada job em progresso
        const freeHours = profile["hours-per-day"] - jobTotalHours
        // renderiza o index passando os jobs como parâmetro
        return response.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}