import express from 'express'
import { 
    listar, inserir, alterar, 
    deletar, listarUm, 
    alterarDisponibilidade, buscarDisponivel,
    buscarIndisponivel
} from '../controller/carro'

export const routerCarro = express.Router()

routerCarro.get('/carro', listar)
routerCarro.get('/carro/:id', listarUm)
routerCarro.get('/car-disp', buscarDisponivel)
routerCarro.get('/car-indisp', buscarIndisponivel)
routerCarro.post('/carro', inserir)
routerCarro.put('/carro/:id/disponibilidade', alterarDisponibilidade)
routerCarro.put('/carro/:id', alterar)
routerCarro.delete('/carro/:id', deletar)