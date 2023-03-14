export type usuario = {
    id: Number;
    name: string;
    password: string;
    management?: boolean;
    token?: string;
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
    checkout: any;
    id?: Number,
    date: String | Date,
    description: String,
    VehicleId: Number,
    cost: Number,
    createdAt?: String,
    updatedAt?: String,
    checkIn:Date,
    checkOut:Date,
}

export interface VehiclesInMaintenance extends Maintenance {
    Vehicle: Vehicle
    id?: Number,
    date: String,
    description: String,
    VehicleId: Number,
    cost: Number,
    createdAt?: String,
    updatedAt?: String,
}

