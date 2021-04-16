// dados do profile
let data = {
    name: "Nilson",
    avatar: "https://www.github.com/NilsonSoares.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

// exporta a função que retorna os dados do profile
module.exports = {
    get() {
        return data
    },
    update(newData){
        data = newData
    }
}