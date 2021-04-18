const Profile = require('../model/Profile')

module.exports = {
    
    async index(request, response) { // index se torna async pois Profile.get() é await
        response.render("profile", { profile: await Profile.get() }) // Profiel.get() deve ser await
    },
    async update(request, response) {// update se torna async pois Profile.

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
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        // atualiza os dados do profile
        await Profile.update({
            // espalha os dados atuais
            ... await Profile.get(),
            // atualiza e acrescenta coom os dados recebidos na requisição
            ...request.body,
            // atualiza o valor da hora
            "value-hour": valueHour
        })

        return response.redirect('/profile')
    }
}