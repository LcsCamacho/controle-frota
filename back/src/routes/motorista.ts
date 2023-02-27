import express from 'express'
import { listar, listarDisponiveis, ListarIndisponiveis, listarUm, inserir, alterar, deletar } from '../controller/motorista'

export const routerMotorista = express.Router()

routerMotorista.get('/motorista', listar)
routerMotorista.get('/motorista/:id', listarUm)
routerMotorista.get('/motoristas-disp', listarDisponiveis)
routerMotorista.get('/motoristas-indisp', ListarIndisponiveis)
routerMotorista.post('/motorista', inserir)
routerMotorista.put('/motorista/:id', alterar)
routerMotorista.delete('/motorista/:id', deletar)