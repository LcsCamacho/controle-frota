import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const listar = (req: Request, res: Response) => {
    prisma.maintenance.findMany().then((manutencoes) => {
        res.json(manutencoes).status(200).end();
    }
    ).catch((err) => {
        res.status(404).end();
    });

};

export const listarUm = (req: Request, res: Response) => {

    prisma.maintenance.findUnique({
        where: {
            id: Number(req.params.id),
        },
    }).then((manutencao) => {
        res.json(manutencao).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });

}

export const inserir = (req: Request, res: Response) => {
    prisma.maintenance.create({
        data: {
            date: req.body.date,
            carId: req.body.carId,
            description: req.body.description,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            cost: req.body.cost,
            operationsId: req.body.operationsId
        }
    }).then((manutencao) => {
        res.json(manutencao).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });
}

export const alterar = (req: Request, res: Response) => {
    prisma.maintenance.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            carId: req.body.carId,
            description: req.body.description,
            updatedAt: req.body.updatedAt,
            cost: req.body.cost,
        }
    }).then((manutencao) => {
        res.json(manutencao).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });

}

export const deletar = (req: Request, res: Response) => {
    prisma.maintenance.delete({
        where: {
            id: Number(req.params.id)
        },
    }).then((manutencao) => {
        res.json(manutencao).status(200).end();
    }
    ).catch((err) => {
        res.status(404).end();
    });
}


