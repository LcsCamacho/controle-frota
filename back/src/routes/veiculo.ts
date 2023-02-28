import express from 'express'
import {
    listar, inserir, alterar,
    deletar, listarUm,
    alterarDisponibilidade, buscarDisponivel,
    buscarIndisponivel
} from '../controller/veiculo'

export const routerVeiculo = express.Router()

routerVeiculo.get('/veiculo', listar)
routerVeiculo.get('/veiculo/:id', listarUm)
routerVeiculo.get('/veiculo-disp', buscarDisponivel)
routerVeiculo.get('/veiculo-indisp', buscarIndisponivel)
routerVeiculo.post('/veiculo', inserir)
routerVeiculo.put('/veiculo/:id/disponibilidade', alterarDisponibilidade)
routerVeiculo.put('/veiculo/:id', alterar)
routerVeiculo.delete('/veiculo/:id', deletar)