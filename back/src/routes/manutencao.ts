import express from 'express'
import { listar, listarUm, inserir, alterar, deletar, finalizar, listarVeiculoEmManutencao } from '../controller/manutencao'

export const routerManutencao = express.Router()

routerManutencao.get('/manutencao',listar)
routerManutencao.get('/manutencao/:id', listarUm)
routerManutencao.get('/veiculos-manutencao', listarVeiculoEmManutencao)
routerManutencao.post('/manutencao', inserir)
routerManutencao.put('/manutencao/finalizar/:id', finalizar)
routerManutencao.put('/manutencao/:id', alterar)
routerManutencao.delete('/manutencao/:id', deletar)