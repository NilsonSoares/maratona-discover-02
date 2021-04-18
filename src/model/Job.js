const Database = require("../db/config")

// Lista de jobs
/*
let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 1,
    Created_at: Date.now(), // atribuindo data atual
    budget: 4500,
  },
  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    Created_at: Date.now(), // atribuindo data atual
  },
  {
    id: 3,
    name: "SGA",
    "daily-hours": 3,
    "total-hours": 100,
    Created_at: Date.now(), // atribuindo data atual
    budget: 4500,
  },
];
*/
// exporta as funções que manipulam os dados dos Jobs
module.exports = {
  //função que que retorna os dados do profile
  async get() {
    const db = await Database()

    const jobs = await db.all(`SELECT * FROM jobs`)

    await db.close()

    return jobs.map(job => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at
    }))
  },
  // atualiza o array de dados
  async update(newJob, jobId) {
    const db = await Database()
    
    await db.run(`UPDATE jobs SET name = "${newJob.name}", daily_hours = ${newJob["daily-hours"]}, total_hours = ${newJob["total-hours"]} WHERE id = ${jobId}`)

    await db.close()
  },
  //deleta um dado do banco de dados
  async delete(id) {
    //data = data.filter(job => Number(job.id) !== Number(id))
    const db = await Database()

    await db.run(`DELETE FROM jobs WHERE id = ${id}`)

    await db.close()
  },
  // cria um novo job no banco de dados
  async create(newJob) {
    const db = await Database()

    await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES ("${newJob.name}", ${newJob["daily-hours"]}, ${newJob["total-hours"]}, ${newJob.created_at})`)

    await db.close()
  }
}
