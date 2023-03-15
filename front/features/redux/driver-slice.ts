import { createSlice } from "@reduxjs/toolkit"

export interface driverSlice {
    open: boolean,
}

const initialState:driverSlice = {
    open: false,
}

export const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        openDashboardReducerDriver: (state) => {
            state.open = !state.open
        },
    },

})

export const { 
    openDashboardReducerDriver,
} = driverSlice.actions
export const driverReducer = driverSlice.reducer