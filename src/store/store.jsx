import {configureStore} from '@reduxjs/toolkit'
import Transcations from '../slices/TransactionSlice'
export const store=configureStore({
    reducer:{
        transactions:Transcations
    }
})

