import { createSlice } from "@reduxjs/toolkit"
import { Vehicle } from "types"

interface VehicleSlice {
    open:boolean
    vehicles:Vehicle[]
}

const initialState:VehicleSlice = {
    open: false,
    vehicles:[],
}

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        openDashboardReducerVehicle: (state) => {
           state.open = !state.open
        },
        setVeiculos: (state, action) => {
            state.vehicles = action.payload
        },
    },
})

export const { 
    openDashboardReducerVehicle,
    setVeiculos
} = vehicleSlice.actions
export const vehicleReducer = vehicleSlice.reducer