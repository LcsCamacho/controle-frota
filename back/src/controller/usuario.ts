import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const listar = (req: Request, res: Response) => {
    prisma.user.findMany().then((usuarios) => {
        res.json(usuarios).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarUm = (req: Request, res: Response) => {
    prisma.user.findUnique({
        where: {
            id: Number(req.params.id),
        },
    }).then((usuario) => {
        res.json(usuario).status(201).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const inserir = (req: Request, res: Response) => {
    prisma.user.create({
        data: {
            name: req.body.name,
            password: req.body.password,
            management: req.body.management,
        },
    }).then((usuario) => {
        res.json(usuario).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const alterar = (req: Request, res: Response) => {
    prisma.user.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name: req.body.name,
            password: req.body.password,
            management: req.body.management,
        },
    }).then((usuario) => {
        res.json(usuario).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const alterarSenha = (req: Request, res: Response) => {
    prisma.user.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            password: req.body.password,
        },
    }).then((usuario) => {
        res.json(usuario).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}

export const alterarGerencia = (req: Request, res: Response) => {
    prisma.user.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            management: req.body.management,
        },
    }).then((usuario) => {
        res.json(usuario).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });

};

export const deletar = (req: Request, res: Response) => {
    prisma.user.delete({
        where: {
            id: Number(req.params.id),
        },
    }).then((usuario) => {
        res.json(usuario).status(201).end();
    }).catch((err) => {
        res.status(500).end();
    });
}


