import { Request, Response } from "express";

export const listar = (req: Request, res: Response) => {
    res.send("Listar");
};

export const inserir = (req: Request, res: Response) => {
    res.send("Inserir");
}

export const alterar = (req: Request, res: Response) => {
    res.send("Alterar");
}

export const deletar = (req: Request, res: Response) => {
    res.send("Deletar");
}


