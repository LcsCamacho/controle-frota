import { Request, Response } from "express";
import { prisma } from "../dao/prismaClient";

export const listar = async (req: Request, res: Response) => {
    prisma.car.findMany().then((carros) => {
        res.json(carros).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarUm = async (req: Request, res: Response) => {
    prisma.car.findUnique({
        where: {
            id: Number(req.params.id),
        },
    }).then((carro) => {
        res.json(carro).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const inserir = async (req: Request, res: Response) => {
    prisma.car.create({
        data: {
            model: req.body.model,
            plate: req.body.plate,
            available: req.body.avaliable,
        },
    }).then((carro) => {
        res.json(carro).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const alterar = async (req: Request, res: Response) => {
    prisma.car.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            model: req.body.model,
            plate: req.body.plate,
            available: req.body.avaliable,
        },
    }).then((carro) => {
        res.json(carro).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const deletar = async (req: Request, res: Response) => {
    prisma.car.delete({
        where: {
            id: Number(req.params.id),
        },
    }).then((carro) => {
        res.json(carro).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}


