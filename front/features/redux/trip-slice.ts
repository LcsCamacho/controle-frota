import { createSlice } from "@reduxjs/toolkit"
import { Trip } from "types"

interface ITrip {
    open: boolean
}

const initialState: ITrip = {
    open: false,
}

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        openDashboardReducerTrip: (state) => {
            state.open = !state.open
        },
    },

})

export const { 
    openDashboardReducerTrip,

} = tripSlice.actions
export const tripReducer = tripSlice.reducer