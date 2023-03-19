import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const listar = (req: Request, res: Response) => {
    prisma.maintenance.findMany({
        include: {
            Vehicle: {
                select: {
                    plate: true,
                }
            }
        }
    }).then((manutencoes) => {
        res.json(manutencoes).status(200).end();
    }
    ).catch((err) => {
        res.send(err).status(404).end();
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

    const { date, VehicleId, description, cost } = req.body;

    prisma.$transaction([
        prisma.maintenance.create({
            data: {
                date: new Date(date),
                VehicleId: Number(VehicleId),
                description: description,
                cost: cost,
            }
        }),
        prisma.vehicle.update({
            where: {
                id: Number(VehicleId),
            },
            data: {
                avaliable: false
            }
        })
    ]).then((manutencao) => {
        res.json({ response: manutencao }).status(201).end();
    }).catch((err) => {
        console.log(err)
        res.json(err).status(404).end();
    });
}

export const alterar = (req: Request, res: Response) => {

    const { description, cost } = req.body;


    prisma.maintenance.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            description: description,
            cost: cost,
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

export const finalizar = (req: Request, res: Response) => {

    const { checkout, id } = req.body;

    prisma.$transaction([
        prisma.maintenance.update({
            where: {
                id: Number(id)
            },
            data: {
                checkout: checkout
            }
        }),
        prisma.vehicle.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                avaliable: true
            }
        })
    ])
        .then((manutencao) => {
            res.json(manutencao).status(200).end();
        })
        .catch((err) => {
            res.json(err).status(404).end();
        })

}

export const listarVeiculoEmManutencao = (req: Request, res: Response) => {
    prisma.maintenance.findMany({
        where: {
            checkout: null
        },
        include: {
            Vehicle: true
        }
    }).then((manutencao) => {
        res.json(manutencao).status(200).end();
    }
    ).catch((err) => {
        res.status(404).json(err).end();
    });
}



