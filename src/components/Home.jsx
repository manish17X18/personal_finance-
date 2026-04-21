import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../slices/TransactionSlice'
import {toast} from 'react-toastify'

const Home = () => {
  const transactions = useSelector(state => state.transactions.transactions)
  const dispatch = useDispatch();
  // console.log(transactions)
  const [data, setData] = useState({
    debit: "",
    credit: "",
  })

  function changeHandler(e) {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(add({
      credit:Number(data.credit||0),
      debit:Number(data.debit||0),
      id:Date.now()
    }))
    if(totalBalance<0){
      toast.error(`Your Account does not have enough balance to deduct.Your Balance ${totalBalance<0?0:totalBalance}`)
      return;
    }
    setData({credit:"",debit:""})
  }

  // Example calculation for the "Converted Value" logic
  const conversionRate = 95; // Example: USD to INR
  //used to calculate the total amount
  const totalIncome= (Array.isArray (transactions)?transactions:[]).reduce((acc,curr)=>acc+Number(curr.credit||0),0)
 
  console.log(totalIncome)


  const totalExpence=(Array.isArray (transactions)?transactions:[]).reduce((acc,curr)=>acc+Number(curr.debit||0),0)
  console.log(totalExpence)
  const totalBalance=totalIncome-totalExpence;
  console.log(totalBalance)
  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className='max-w-2xl bg-slate-800 rounded-xl shadow-2xl mx-auto overflow-hidden border border-slate-700'>
        
        {/* Header Section */}
        <div className='bg-slate-700/50 p-6 border-b border-slate-600'>
          <h2 className='text-center text-sm uppercase tracking-widest text-slate-400 font-bold'>Current Overview</h2>
          <div className='text-center text-4xl text-amber-400 font-bold mt-2'>
            Total Balance: <span className='text-white'>
              {
                totalBalance<0?
                <div >Error</div>
                :
                totalBalance
              }
            </span>
          </div>
        </div>

        <form onSubmit={submitHandler} className='p-8 space-y-8'>
          
          {/* Expense Section (Debit) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-end'>
            <div className='flex flex-col gap-2'>
              <label className='text-amber-300 font-medium'>Add Expense</label>
              <input 
                type='number'
                name='debit'
                value={data.debit}
                onChange={changeHandler}
                placeholder='0.00'
                className='bg-slate-900 border border-slate-600 rounded-lg p-3 text-amber-100 outline-none focus:border-amber-500 transition-all shadow-inner'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-slate-400 text-sm'>Currency</label>
              <div className='bg-slate-700 text-slate-200 p-3 rounded-lg border border-slate-600 text-center font-semibold'>
                USD (Default)
              </div>
            </div>
          </div>

          <hr className='border-slate-700' />

          {/* Income Section (Credit) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-end'>
            <div className='flex flex-col gap-2'>
              <label className='text-emerald-400 font-medium'>Add Income</label>
              <input 
                type='number'
                name='credit'
                value={data.credit}
                onChange={changeHandler}
                placeholder='0.00'
                className='bg-slate-900 border border-slate-600 rounded-lg p-3 text-emerald-100 outline-none focus:border-emerald-500 transition-all shadow-inner'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-slate-400 text-sm'>Converted Value (INR)</label>
              <div className='bg-emerald-900/30 text-emerald-400 p-3 rounded-lg border border-emerald-900/50 text-center font-bold'>
                ₹ {data.credit ? (data.credit * conversionRate).toLocaleString() : "0.00"}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button 
              type='submit'
              className='w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg'
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home