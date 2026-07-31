const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const caminhoBanco = path.join(__dirname, "banco.db");

const db = new sqlite3.Database(caminhoBanco, (erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco:", erro.message);
    } else {
        console.log("Banco de dados conectado!");
    }
});

module.exports = db;

//Criar Tabela

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            criado_em DATATIME DEFAULT CURRENT_TIMESTAMP    
            )
    `, (erro) => {
        if (erro) {
            console.error("erro ao criar tabela:", erro.message);
        } else {
            console.log("Tabela 'usuarios' pronta!");
        }
    });
});