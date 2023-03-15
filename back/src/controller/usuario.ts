import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type token = {
    id: number,
    name: string,
    management: boolean,
    token?: string
}


export const login = async (req: Request, res: Response) => {
    prisma.user.findUnique({
        where: {
            name: req.body.name,
        },
    }).then((usuario) => {
        if (usuario) {
            if (usuario.password === req.body.password) {
                let data:token = {    
                    id: usuario.id,
                    name: usuario.name,
                    management: usuario.management,
                    token: ''
                };

                if(process.env.JWT_PRIVATE_KEY === undefined) {
                    console.log('Internal server error.');
                    return res.status(500).send('Internal server error.');
                }
                jwt.sign(data, process.env.JWT_PRIVATE_KEY, { expiresIn: '60m' },(err, token) => {
                    if(!err) {
                        data.token = token;
                        //process.env.JWT_PRIVATE_KEY = token;
                        res.status(200).json(data).end();
                    }else {
                        console.log(err);
                        res.status(404).json(err).end();
                    }
                });
            } else {
                res.json("Error: Usuario ou senha inválidos ").status(401).end();
            }
        } else {
            res.status(401).end();
        }
    }).catch((err) => {
        res.status(404).end();
    });

}

export const listar = (req: Request, res: Response) => {
    prisma.user.findMany().then((usuarios) => {
        res.json(usuarios).status(200).end();
    }).catch((err) => {
        res.status(404).end();
    });
};

export const listarUm = (req: Request, res: Response) => {
    prisma.user.findFirst({
        where: {
            name: String(req.params.username)
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
        console.log(err)
        res.status(404).end();
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


