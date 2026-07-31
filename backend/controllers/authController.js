const usuarioModel = require("../models/usuarioModel");

async function cadastrarUsuario(req, res) {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios!!!"
        })
    }

    const usuario = await usuarioModel.buscarPorEmail(email)

    if (!usuario){
        await usuarioModel.criarUsuario(nome, email, senha)

        return res.status(201).json({
            mensagem: "Usuário criado!"
        })
    } else {
        return res.status(400).json({
            mensagem: "Email já cadastrado!!!"
        })
    }
}

module.exports = {
    cadastrarUsuario
};