const usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");

async function cadastrarUsuario(req, res) {

    try {
        const { nome, email, senha } = req.body;
    
        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios!!!"
            })
        }
    
        const usuario = await usuarioModel.buscarPorEmail(email)
    
        if (usuario){
            return res.status(409).json({
                mensagem: "Email já cadastrado!!!"
            })
        }
        const senhaHash = await bcrypt.hash(senha,10);

        await usuarioModel.criarUsuario(nome, email, senhaHash)

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso."
        })
        
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

module.exports = {
    cadastrarUsuario
};