import express from "express";
import { 
    listar, 
    criar, 
    deletar, 
    atualizar, 
    finalizar,
    listarUm
} from "../controller/viagem";

export const routerViagem = express.Router()

routerViagem.get('/viagem', listar)
routerViagem.get('/viagem/:id', listarUm)
routerViagem.post('/viagem', criar)
routerViagem.delete('/viagem/:id', deletar)
routerViagem.put('/viagem/:id', atualizar)
routerViagem.put('/viagem/finalizar/:id', finalizar)


