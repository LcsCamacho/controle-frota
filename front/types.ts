export type usuario = {
    id: Number;
    name: string;
    password: string;
    management?: boolean;
    token?: string;
}

export interface ListarCarroProps {
    vehiclesList: Vehicle[];
}

export interface ListarCarroDispProps {
    vehiclesListDisp:Vehicle[];
}

export interface ListarCarroIndispProps {
    vehiclesListIndisp:Vehicle[];
}

export interface reduxUsuario {
    user: {
        user: usuario;
    }
}

export type Vehicle = {
    id?: Number,
    model: String,
    plate: String,
    avaliable?: Boolean,
    type: String,
}

export type Driver = {
    id?: Number,
    name: String,
    cnh: String,
    avaliable: Boolean,
}

export interface Maintenance {
    id?: Number,
    date: String,
    description: String,
    vehicleId: Number,
    cost: Number,
    createdAt?: String,
    updatedAt?: String,
}

