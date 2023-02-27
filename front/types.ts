export type usuario = {
    name: string;
    password: string;
    management?: boolean;
}

export interface reduxUsuario {
    user: {
        user: usuario;
    }
}

export type Car = {
    id: Number,
    model: String,
    plate: String,
    avaliable: Boolean,
}

export type Driver = {
    id: Number,
    name: String,
    avaliable: Boolean,
}

