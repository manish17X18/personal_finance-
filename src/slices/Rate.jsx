import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'

export const fetchRate=createAsyncThunk('transcations/fetchrate',async()=>{
    const response=await fetch(`https://api.frankfurter.dev/v1/latest?base=USD`)
    const data=await response.json();
    return data.rates;
})

const TranscationsSlice=createSlice({
    name:'rate',
    initialState:{
        transcations:[],
        rates:{},
        status:'idle'
    },
    reducers:{
        add:(state,action)=>{
            state.transcations.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchRate.pending,(state)=>{
            state.status='load'
        })
        .addCase(fetchRate.fulfilled,(state,action)=>{
            state.status='success';
            state.rates=action.payload
        })
        .addCase(fetchRate.rejected,(state)=>{
            state.status='fail'
        })
    }
})

export const {add}=TranscationsSlice.actions
export default TranscationsSlice.reducer