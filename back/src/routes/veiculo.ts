import express from 'express'
import {
    listar, 
    inserir, 
    alterar,
    deletar, 
    listarUm,
    alterarDisponibilidade,
    buscarDisponivel,
    buscarIndisponivel,
    listarVarios
} from '../controller/veiculo'
import { auth } from '../middlewares/middlewares'

export const routerVeiculo = express.Router()

routerVeiculo.get('/veiculo', listar)
routerVeiculo.get('/veiculosFiltro', listarVarios)
routerVeiculo.get('/veiculo/:id', listarUm)
routerVeiculo.get('/veiculo-disp', buscarDisponivel)
routerVeiculo.get('/veiculo-indisp', buscarIndisponivel)
routerVeiculo.post('/veiculo', auth, inserir)
routerVeiculo.put('/veiculo/:id/disponibilidade', auth, alterarDisponibilidade)
routerVeiculo.put('/veiculo/:id', auth, alterar)
routerVeiculo.delete('/veiculo/:id', auth, deletar)