const usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");

async function cadastrarUsuario(req, res) {

    try {
        const { nome, email, senha } = req.body;
    
        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios."
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

async function loginUsuario(req, res) {

    try {
        const { identificador, senha } = req.body;
        
        if (!identificador || !senha) {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios."
            });
        }
        
        const usuario = await usuarioModel.buscarPorIdentificador(identificador);

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Usuário ou senha inválidos."
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Usuário ou senha inválidos."
            });
        }

        console.log(`Login realizado: ${usuario.nome_usuario}`);

        return res.status(200).json({
            mensagem: "Login efetuado com sucesso"
        })
        
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}


module.exports = {
    cadastrarUsuario,
    loginUsuario
};