import express from 'express'
import { 
    listar, 
    inserir, 
    alterar, 
    deletar, 
    login, 
    listarUm
} from '../controller/usuario'
import { auth } from '../middlewares/middlewares'

export const routerUsuario = express.Router()

routerUsuario.put('*', auth)
routerUsuario.delete('*', auth)

routerUsuario.get('/usuario', auth, listar)
routerUsuario.get('/usuario/:username', listarUm)
routerUsuario.post('/usuario', auth, inserir)
routerUsuario.post('/login', login)
routerUsuario.put('/usuario/:id', alterar)
routerUsuario.delete('/usuario/:id', deletar)