import { createSlice } from "@reduxjs/toolkit"

interface carSlice {
    open:boolean
}

const initialState = {
    open: false
}

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        openDashboardReducerCar: (state) => {
           state.open = !state.open
        },

    },

})

export const { openDashboardReducerCar } = carSlice.actions
export const carReducer = carSlice.reducer