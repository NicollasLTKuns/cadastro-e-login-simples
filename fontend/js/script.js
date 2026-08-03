import {verSenha} from './função.js'
import {cadastrarUsuario} from './função.js'
import {loginUsuario} from './função.js'

document.getElementById('mostrar-senha').addEventListener("click", verSenha);
cadastrarUsuario();
loginUsuario();