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
    prisma.$transaction([
        prisma.maintenance.create({
            data: {
                date: new Date(req.body.date),
                VehicleId: req.body.vehicleId,
                description: req.body.description,
                cost: req.body.cost,
                Vehicle: {}
            }
        }),
        prisma.vehicle.update({
            where: {
                id: req.body.vehicleId,
            },
            data: {
                avaliable: false
            }
        })
    ]).then((manutencao) => {
        res.json({response:manutencao}).status(201).end();
    }).catch((err) => {
        console.log(err)
        res.json(err).status(404).end();
    });
}

export const alterar = (req: Request, res: Response) => {
    prisma.maintenance.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
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

export const finalizar = (req: Request, res: Response) => {
    prisma.$transaction([
        prisma.maintenance.update({
            where: {
                id: req.body.id
            },
            data: {
                checkout: req.body.checkout
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



