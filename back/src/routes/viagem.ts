import express from "express";
import { 
    listar, 
    criar, 
    deletar, 
    atualizar, 
    finalizar,
    listarUm
} from "../controller/viagem";
import { auth } from "../middlewares/middlewares";

export const routerViagem = express.Router()

routerViagem.get('/viagem', listar)
routerViagem.get('/viagem/:id', listarUm)
routerViagem.post('/viagem', auth, criar)
routerViagem.delete('/viagem/:id', auth, deletar)
routerViagem.put('/viagem/:id', auth, atualizar)
routerViagem.put('/viagem/finalizar/:id', auth, finalizar)


