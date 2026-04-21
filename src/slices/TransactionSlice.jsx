import { createSlice } from "@reduxjs/toolkit";

const initialState={
    transactions:[]
}

export const transactionsSlice=createSlice({
    name:'transaction',
    initialState,
    reducers:{
        add:(state,action)=>{
            state.transactions.push(action.payload)
        }
    }
})

export const {add} =transactionsSlice.actions
export default transactionsSlice.reducer