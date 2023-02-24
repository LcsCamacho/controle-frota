import express from 'express'
import { listar, inserir, alterar, deletar } from '../controller/manutencao'

export const routerManutencao = express.Router()

routerManutencao.get('/manutencao', listar)
routerManutencao.post('/manutencao', inserir)
routerManutencao.put('/manutencao/:id', alterar)
routerManutencao.delete('/manutencao/:id', deletar)