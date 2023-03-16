import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const listar = (req: Request, res: Response) => {
    prisma.trip.findMany({
        include: {
            Vehicle: {
                select: {
                    plate: true,
                    type: true,
                    avaliable: true,
                }
            },
            Driver: {
                select: {
                    name: true,
                    avaliable: true,
                }
            }
        }
    }).then((viagens) => {
        res.status(200).json(viagens);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};

export const listarUm = (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.trip.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            Vehicle: {
                select: {
                    plate: true,
                    type: true,
                }
            },
            Driver: {
                select: {
                    name: true,
                    avaliable: true,
                }
            }
        }
    }).then((viagem) => {
        res.status(200).json(viagem);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
}

export const criar = (req: Request, res: Response) => {
    const { date, VehicleId, DriverId } = req.body;
    prisma.$transaction([
        prisma.trip.create({
            data: {
                date: new Date(date),
                VehicleId: Number(VehicleId),
                DriverId: Number(DriverId)
            }
        }),
        prisma.vehicle.update({
            where: {
                id: Number(VehicleId)
            },
            data: {
                avaliable: false
            }
        }),
        prisma.driver.update({
            where: {
                id: Number(DriverId)
            },
            data: {
                avaliable: false
            }
        })
    ]).then((viagem) => {
        res.status(201).json(viagem);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};

export const deletar = (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.trip.delete({
        where: {
            id: Number(id)
        }
    }).then((viagem) => {
        res.status(200).json(viagem);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};

export const atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, VehicleId, DriverId } = req.body;
    prisma.$transaction([
        prisma.trip.update({
            where: {
                id: Number(id)
            },
            data: {
                date,
                VehicleId,
                DriverId
            }
        }),
        prisma.vehicle.update({
            where: {
                id: VehicleId
            },
            data: {
                avaliable: false

            }
        }),
        prisma.driver.update({
            where: {
                id: DriverId
            },
            data: {
                avaliable: false
            }
        })
    ]).then((viagem) => {
        res.status(200).json(viagem);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
}

export const finalizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { VehicleId, DriverId } = req.body;
    prisma.$transaction([
        prisma.trip.update({
            where: {
                id: Number(id)
            },
            data: {
                checkOut: new Date()
            }
        }),
        prisma.vehicle.update({
            where: {
                id: Number(VehicleId)
            },
            data: {
                avaliable: true
            }
        }),
        prisma.driver.update({
            where: {
                id: Number(DriverId)
            },
            data: {
                avaliable: true
            }
        })
    ]).then((viagem) => {
        res.status(200).json(viagem);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });

}
