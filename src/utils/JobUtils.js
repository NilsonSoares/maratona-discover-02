module.exports = {
    remainingDays(job) {
        // cálculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        const createdDate = new Date(job.created_at)
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