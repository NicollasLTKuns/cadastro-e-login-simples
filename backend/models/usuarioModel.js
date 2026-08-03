const { promises } = require("graceful-fs");
const db = require("../database/database");

function buscarPorEmail(email) {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM usuarios WHERE email = ?",
            [email],
            (erro, usuario) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve(usuario);
                }
            }
        );
    });
}

function criarUsuario(nome, email, senha) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            INSERT INTO usuarios (nome, email, senha)
            VALUES(?, ?, ?)
            `,
            [nome, email, senha],
            function (erro) {
                if (erro) {
                    reject(erro);
                } else {
                    resolve({
                        id: this.lastId
                    });
                }
            }
        );
    });
}

function buscarPorIdentificador(identificador) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT *
            FROM usuarios
            WHERE email = ?
               OR nome_usuario = ?;`,
            [identificador, identificador],
            (erro, usuario) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve(usuario);
                }
            }
        );
    });
}

module.exports = {
    buscarPorEmail,
    criarUsuario
};