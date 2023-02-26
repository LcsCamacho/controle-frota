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
        openDashboardReducer: (state) => {
           state.open = !state.open
        },

    },

})

export const { openDashboardReducer } = carSlice.actions
export const carReducer = carSlice.reducer