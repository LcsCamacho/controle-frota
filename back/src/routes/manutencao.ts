import express from 'express'
import {
    listar,
    listarUm,
    inserir,
    alterar,
    deletar,
    finalizar,
    listarVeiculoEmManutencao
} from '../controller/manutencao'
import { auth } from '../middlewares/middlewares'

export const routerManutencao = express.Router()

routerManutencao.get('/manutencao', listar)
routerManutencao.get('/manutencao/:id', listarUm)
routerManutencao.get('/veiculos-manutencao', listarVeiculoEmManutencao)
routerManutencao.post('/manutencao', auth, inserir)
routerManutencao.put('/manutencao/finalizar/:id', auth, finalizar)
routerManutencao.put('/manutencao/:id', auth, alterar)
routerManutencao.delete('/manutencao/:id', auth, deletar)