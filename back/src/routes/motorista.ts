import express from 'express'
import { listar, listarDisponiveis, ListarIndisponiveis, listarUm, inserir, alterar, deletar, alterarDisponibilidade } from '../controller/motorista'
import { auth } from '../middlewares/middlewares'

export const routerMotorista = express.Router()

routerMotorista.get('/motorista', listar)
routerMotorista.get('/motorista/:id', listarUm)
routerMotorista.get('/motoristas-disp', listarDisponiveis)
routerMotorista.get('/motoristas-indisp', ListarIndisponiveis)
routerMotorista.post('/motorista', auth, inserir)
routerMotorista.put('/motorista/:id', auth, alterar)
routerMotorista.put('/motorista/disponibilidade/:id', auth, alterarDisponibilidade)
routerMotorista.delete('/motorista/:id', auth, deletar)