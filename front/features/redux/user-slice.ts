import { createSlice } from "@reduxjs/toolkit"

type userType = {
    name:String,
    management: boolean,
    password?:String
}

interface userState {
    user:userType
}

const initialState:userState = {
    user:{
        name:'',
        management: false
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserReducer: (state, action) => {
            state.user = action.payload
        },
        logOffReducer: (state) => {
            state.user = initialState.user
        }
    },

})

export const { setUserReducer,logOffReducer } = userSlice.actions
export const userReducer = userSlice.reducer