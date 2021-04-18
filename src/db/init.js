const Database = require('./config')

const initDb = {
    async init() {

        const db = await Database() // inicia a conexão com o banco de dados (await aguarda a conexão ser estabelecida para executar a próxima instrução)

        await db.exec(
            `CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`
        )// executa a query para criar a tabela profile

        await db.exec(
            `CREATE TABLE jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )`
        )// executa a query para criar a tabela jobs

        await db.run(// insere um valor na tabela profile
            `INSERT INTO profile (name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour) VALUES ("Nilson Soares", "https://www.github.com/NilsonSoares.png", 3000, 5, 5, 4, 75);`
        )

        await db.run(// insere um job na tabela jobs
            `INSERT INTO jobs(name, daily_hours, total_hours, created_at) VALUES("Pizzaria Guloso", 2, 1, 1617514376018);`
        )

        await db.run(// insere um job na tabela jobs
            `INSERT INTO jobs(name, daily_hours, total_hours, created_at) VALUES("OneTwo Projects", 3, 47, 1617514376018);`
        )

        await db.close()// encerra a conexão com o banco de dados

    }
}

initDb.init()