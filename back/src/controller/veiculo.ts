import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const listar = (req: Request, res: Response) => {
    prisma.vehicle.findMany().then((vehicle) => {
        res.json(vehicle).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarVarios = (req: Request, res: Response) => {
    prisma.vehicle.findMany(
        {
            where: {
                id: {
                    in: req.body.id
                }
            }
        }
    ).then((vehicle) => {
        res.json(vehicle).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarUm = (req: Request, res: Response) => {
    prisma.vehicle.findUnique({
        where: {
            id: Number(req.params.id),
        },
    }).then((vehicle) => {
        res.json(vehicle).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const buscarDisponivel = (req: Request, res: Response) => {
    prisma.vehicle.findMany({
        where: {
            avaliable: true,
        },
    }).then((vehicle) => {
        res.json(vehicle).status(200).end();
    }).catch((err) => {
        res.send(err).status(404).end();
    });
};

export const buscarIndisponivel = (req: Request, res: Response) => {
    prisma.vehicle.findMany({
        where: {
            avaliable: false,
        },
    }).then((vehicle) => {
        res.json(vehicle).status(200).end();
    }).catch((err) => {
        res.send(err).status(404).end();
    });
}

export const inserir = (req: Request, res: Response) => {

    const { model, plate, avaliable, type } = req.body;

    prisma.vehicle.create({
        data: {
            model: model,
            plate: plate,
            avaliable: avaliable,
            type: type
        },
    }).then((vehicle) => {
        res.json(vehicle).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const alterar = (req: Request, res: Response) => {

    const { model, plate, avaliable, type } = req.body;

    prisma.vehicle.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            model: model,
            plate: plate,
            avaliable: avaliable,
            type: type
        },
    }).then((vehicle) => {
        res.json(vehicle).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const alterarDisponibilidade = (req: Request, res: Response) => {
    prisma.vehicle.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            avaliable: req.body.avaliable,
        },
    }).then((vehicle) => {
        res.json(vehicle).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}


export const deletar = (req: Request, res: Response) => {
    prisma.vehicle.delete({
        where: {
            id: Number(req.params.id),
        },
    }).then((vehicle) => {
        res.json(vehicle).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}


