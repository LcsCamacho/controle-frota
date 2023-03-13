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
    date: String | Date,
    description: String,
    VehicleId: Number,
    cost: Number,
    createdAt?: String,
    updatedAt?: String,
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

