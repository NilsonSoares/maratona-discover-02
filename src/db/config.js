// faz a importação do sqlite 3 e da função open() do sqlite
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

// abrindo a conexão com o banco de dados
module.exports = () => open({// open deve estar dentro de uma função anônima
        filename: './database.sqlite',// arquivo onde serão salvas as informações
        driver: sqlite3.Database// driver que irá gerenciar
    })