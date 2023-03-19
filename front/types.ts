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

export type Trip = {
    id?: Number,
    date: Date,
    VehicleId: Number,
    DriverId: Number,
    createdAt?: String,
    updatedAt?: String,
    checkIn:Date,
    checkOut?:Date,
    Vehicle:{
        plate:string;
        avaliable:boolean;
        type:string;
    },
    Driver:{
        name:string;
    }
}   

export interface InsertTrip{
    id?: Number,
    date: Date,
    VehicleId: Number,
    DriverId: Number,
    createdAt?: String,
    updatedAt?: String,
    checkIn:Date,
    checkOut?:Date,
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
    checkIn:Date,
    checkout?:Date,
}

export interface VehiclesInMaintenance {
    Vehicle: Vehicle
    id?: Number,
    date: String,
    description: String,
    VehicleId: Number,
    cost: Number,
    createdAt?: String,
    updatedAt?: String,
}

