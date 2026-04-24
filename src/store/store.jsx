import {configureStore} from '@reduxjs/toolkit'
import Transcations from '../slices/TransactionSlice'
import RateExchange from '../slices/Rate'
export const store=configureStore({
    reducer:{
        transactions:Transcations,
        rate:RateExchange
    }
})

