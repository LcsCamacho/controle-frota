import { createSlice } from "@reduxjs/toolkit"
import { Driver } from "types"
import { useAddDriver } from "hooks/UseAddDriver"
import { useListDriver } from "hooks/UseListDriver"

interface driverSlice {
    open: boolean,
    drivers: Driver[]
}

interface driverPayload {
    payload: Driver
}

const initialState:any = {
    open: false,
    drivers: useListDriver()
}

export const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        openDashboardReducerDriver: (state) => {
            state.open = !state.open
        },
        setDrivers: (state, { payload }: driverPayload) => {
            useAddDriver(payload)
            state.drivers = [...state.drivers, payload]
        },
    },

})

export const { openDashboardReducerDriver, setDrivers } = driverSlice.actions
export const driverReducer = driverSlice.reducer