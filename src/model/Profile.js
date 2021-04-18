const Database = require("../db/config")

// dados do profile
/*
let data = {
    name: "Nilson",
    avatar: "https://www.github.com/NilsonSoares.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}*/

// exporta a função que retorna os dados do profile
module.exports = {
    async get() {
        const db = await Database() // inicia a conexão com o banco de dados
        
        // db.get() retorna um único elemento
        const data = await db.get(`SELECT * FROM profile`)

        await db.close()

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        }
    },
    async update(newData){
        const db = await Database() // inicia a conexão com o banco de dados
        
        await db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["value-hour"]}        
        `)

        await db.close()
    }
}