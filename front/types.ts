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

export type Vehicle = {
    id: Number,
    model: String,
    plate: String,
    avaliable: Boolean,
    type: String,
}

export type Driver = {
    id: Number,
    name: String,
    avaliable: Boolean,
}

