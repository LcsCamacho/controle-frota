import express from 'express'
import { listar, inserir, alterar, deletar, listarUm } from '../controller/carro'

export const routerCarro = express.Router()

routerCarro.get('/carro', listar)
routerCarro.get('/carro/:id', listarUm)
routerCarro.post('/carro', inserir)
routerCarro.put('/carro/:id', alterar)
routerCarro.delete('/carro/:id', deletar)