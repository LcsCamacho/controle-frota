import express from 'express'
import { listar, inserir, alterar, deletar } from '../controller/usuario'

export const routerUsuario = express.Router()

routerUsuario.get('/usuario', listar)
routerUsuario.post('/usuario', inserir)
routerUsuario.put('/usuario/:id', alterar)
routerUsuario.delete('/usuario/:id', deletar)