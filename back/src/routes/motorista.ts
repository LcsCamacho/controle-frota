import express from 'express'
import { listar, inserir, alterar, deletar } from '../controller/motorista'

export const routerMotorista = express.Router()

routerMotorista.get('/motorista', listar)
routerMotorista.post('/motorista', inserir)
routerMotorista.put('/motorista/:id', alterar)
routerMotorista.delete('/motorista/:id', deletar)