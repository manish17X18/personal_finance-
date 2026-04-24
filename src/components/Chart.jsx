import React from 'react'
import { useEffect } from 'react'
import{fetchRate} from '../slices/Rate'
import { useDispatch,useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'
const Chart = () => {
  const dispatch=useDispatch();
  const {rates,status}=useSelector((state)=>state.rate)
  // console.log(rates)
  useEffect(()=>{
    if(status==='idle'){
      dispatch(fetchRate())
    }
  },[status,dispatch]);
  if(status==='load'){
    return(
      <div>Loading...</div>
    )
  }
  const rateArray=rates?Object.entries(rates):[];
  return (
    <div className='w-10/12 bg-slate-900 mx-auto'>
      <div className=' bg-slate-700 rounded-2xl p-4 text-center '>
        <p className='text-2xl text-amber-400 uppercase tracking-widest'>1$ is Equivalent to</p>
      </div>
      <div className='grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-11/12 mx-auto gap-y-2 mt-3 bg-slate-700 p-4 rounded-2xl '>
        {
          rateArray.length>0 ?
          (
            rateArray.map(([currency,value])=>(
              <p className='font-semibold' key={currency}><span className='text-green-500'>{currency}</span>-<span className='text-red-500'>{value}</span></p>
            ))
          ):
          (<div>No Data to Display</div>)
        }
      </div>
    </div>
  );
}

export default Chart
