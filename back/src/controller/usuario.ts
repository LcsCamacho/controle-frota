import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const login = async (req: Request, res: Response) => {
    // let usuario = await prisma.user.findUnique({
    //     where: {
    //         name: req.body.name,
    //     },
    // });
    // if (usuario) {
    //     console.log(usuario)
    // }

    prisma.user.findUnique({
        where: {
            name: req.body.name,
        },
    }).then((usuario) => {
        if (usuario) {
            if (usuario.password === req.body.password) {
                let data = {    
                    id: usuario.id,
                    name: usuario.name,
                    management: usuario.management,
                    token: ''
                };
                // const token = jwt.sign(data,
                //     process.env.JWT_PRIVATE_KEY ?? '',
                //     { expiresIn: '1h' });
                // if (!token) return res.status(401).send('Access denied. No token provided.');
                // data.token = token;
                res.json(data).status(200).end();
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


