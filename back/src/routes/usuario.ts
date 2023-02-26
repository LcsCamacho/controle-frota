import express from 'express'
import { listar, inserir, alterar, deletar, login, listarUm} from '../controller/usuario'

export const routerUsuario = express.Router()

routerUsuario.get('/usuario', listar)
routerUsuario.get('/usuario/:username', listarUm)
routerUsuario.post('/usuario', inserir)
routerUsuario.post('/login', login)
routerUsuario.put('/usuario/:id', alterar)
routerUsuario.delete('/usuario/:id', deletar)