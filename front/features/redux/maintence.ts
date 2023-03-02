import { createSlice } from "@reduxjs/toolkit"

interface IMaintenance {
    open:boolean
}

const initialState:IMaintenance = {
    open: false
}

export const MaintenanceSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {
        openDashboardReducerMaintenance: (state) => {
           state.open = !state.open
        },

    },

})

export const { openDashboardReducerMaintenance } = MaintenanceSlice.actions
export const MaintenanceReducer = MaintenanceSlice.reducer