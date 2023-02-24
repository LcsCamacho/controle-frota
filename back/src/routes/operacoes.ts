import express from 'express'
import { listar, inserir, alterar, deletar } from '../controller/operacoes'

export const routerOperacoes = express.Router()

routerOperacoes.get('/operacoes', listar)
routerOperacoes.post('/operacoes', inserir)
routerOperacoes.put('/operacoes/:id', alterar)
routerOperacoes.delete('/operacoes/:id', deletar)
