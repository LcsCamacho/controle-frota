import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const listar = (req: Request, res: Response) => {
    prisma.operations.findMany().then((operacoes) => {
        res.json(operacoes).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarUm = (req: Request, res: Response) => {

    prisma.operations.findUnique({
        where: {
            id: Number(req.params.id),
        },
    }).then((operacao) => {
        res.json(operacao).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });
}

export const inserir = (req: Request, res: Response) => {
    prisma.operations.create({
        data: {
            date: req.body.date,
            driverId: req.body.driverId,
            carId: req.body.carId,
            description: req.body.description,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt

        }
    }).then((operacao) => {
        res.json(operacao).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });

}

export const alterar = (req: Request, res: Response) => {

    prisma.operations.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            driverId: req.body.driverId,
            carId: req.body.carId,
            description: req.body.description,

        }
    }).then((operacao) => {
        res.json(operacao).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });

}

export const deletar = (req: Request, res: Response) => {
    prisma.operations.delete({
        where: {
            id: Number(req.params.id)
        }
    }).then((operacao) => {
        res.json(operacao).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
}


