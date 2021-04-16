// Lista de jobs
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
// exporta as funções que manipulam os dados dos Jobs
module.exports = {
  //função que que retorna os dados do profile
  get() {
    return data;
  },
  // atualiza o array de dados
  update(newJob) {
    data = newJob
  },
  //deleta um dado do array
  delete(id) {
    data = data.filter(job => Number(job.id) !== Number(id))
  }
}
