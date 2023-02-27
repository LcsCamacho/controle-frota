import { createSlice } from "@reduxjs/toolkit"

interface driverSlice {
    open:boolean
}

const initialState = {
    open: false
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

export const { openDashboardReducerDriver } = driverSlice.actions
export const driverReducer = driverSlice.reducer