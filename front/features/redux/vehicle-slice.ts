import { createSlice } from "@reduxjs/toolkit"

interface VehicleSlice {
    open:boolean
}

const initialState:VehicleSlice = {
    open: false
}

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        openDashboardReducerVehicle: (state) => {
           state.open = !state.open
        },

    },

})

export const { openDashboardReducerVehicle } = vehicleSlice.actions
export const vehicleReducer = vehicleSlice.reducer