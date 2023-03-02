import express from 'express'
import { listar, listarUm, inserir, alterar, deletar } from '../controller/manutencao'

export const routerManutencao = express.Router()

routerManutencao.get('/manutencao', listar)
routerManutencao.get('/manutencao/:id', listarUm)
routerManutencao.post('/manutencao', inserir)
routerManutencao.put('/manutencao/:id', alterar)
routerManutencao.delete('/manutencao/:id', deletar)