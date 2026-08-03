export function verSenha() {
    const senha = document.getElementById('senha')
    
    if (senha.type === 'password') {
        senha.type = 'text'
    } else {
        senha.type = 'password'
    }
}

export function cadastrarUsuario() {
    const form = document.getElementById("campos-cadastro")

    form.addEventListener("submit", async (evento) => {
        evento.preventDefault()

        try {

            const nome = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
    
            const usuario = {
                nome,
                email,
                senha
            };

            const resposta = await fetch("http://localhost:3000/auth/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                console.warn("Erro no cadastro:", dados.mensagem || "Erro desconhecido");
                alert("Erro no cadastro:", dados.mensagem || "Erro desconhecido");
                return
            };

            console.log(dados.mensagem);
            alert(dados.mensagem);
            
        } catch (erro) {
            console.error("erro de requisição:", erro)
        };
    });
};

export function loginUsuario() {
    const form = document.getElementById("campos-login")

    form.addEventListener("submit", async (evento) => {
        evento.preventDefault()

        try {

            const identificador = document.getElementById('nome-email').value;
            const senha = document.getElementById('senha').value;
    
            const usuario = {
                identificador,
                senha
            };

            if (!identificador || !senha) {
                alert("Preencha todos os campos.");
                return;
            }

            const resposta = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                console.warn("Erro no Login:", dados.mensagem || "Erro desconhecido");
                alert(`Erro no Login: ${dados.mensagem || "Erro desconhecido"}`);
                return
            };

            console.log(dados.mensagem);
            alert(dados.mensagem);
            
            
        } catch (erro) {
            console.error(erro);
            alert("Não foi possível conectar ao servidor.");
        };
    });
};