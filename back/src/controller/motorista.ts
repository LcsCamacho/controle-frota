import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const listar = (req: Request, res: Response) => {
    prisma.driver.findMany().then((motoristas) => {
        res.json(motoristas).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarUm = (req: Request, res: Response) => {
    prisma.driver.findUnique({
        where: {
            id: Number(req.params.id),
        },
    }).then((motorista) => {
        res.json(motorista).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarDisponiveis = (req: Request, res: Response) => {
    prisma.driver.findMany({
        where: {
            avaliable: true,
        },
    }).then((motoristas) => {
        res.json(motoristas).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
}

export const ListarIndisponiveis = (req: Request, res: Response) => {
    prisma.driver.findMany({
        where: {
            avaliable: false,
        },
    }).then((motoristas) => {
        res.json(motoristas).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
}
export const inserir = (req: Request, res: Response) => {
    prisma.driver.create({
        data: {
            name: req.body.name,
            cnh: req.body.cnh,
            avaliable: req.body.avaliable,
        },
    }).then((motorista) => {
        res.json(motorista).status(201).end();
    }
    ).catch((err) => {
        res.status(500).json(err).end();
    });

}

export const alterar = (req: Request, res: Response) => {
    prisma.driver.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name: req.body.name,
            cnh: req.body.cnh,
            avaliable: req.body.avaliable,
        },
    }).then((motorista) => {
        res.json(motorista).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const alterarDisponibilidade = (req: Request, res: Response) => {
    prisma.driver.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            avaliable: req.body.avaliable,
        },
    }).then((motorista) => {
        res.json(motorista).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });

};

export const deletar = (req: Request, res: Response) => {
    prisma.driver.delete({
        where: {
            id: Number(req.params.id),
        },
    }).then((motorista) => {
        res.json(motorista).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}


