import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        console.log('Access denied. No token provided.');
        console.log(token);
        return res.status(401).send('Access denied. No token provided.');
    }

    if (process.env.JWT_PRIVATE_KEY === undefined) return res.status(500).send('Internal server error.');

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {

            res.status(400).json({
                message: 'Invalid token.',
                err,
                "key":process.env.JWT_PRIVATE_KEY,
                token
            });
        } else {
            next();
        }
    });
}
