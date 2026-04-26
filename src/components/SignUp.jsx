import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { add } from '../slices/SignUpSlice';
import {NavLink} from 'react-router-dom'
import { useSnackbar } from 'notistack';
const SignUp = () => {
  const users=useSelector((state)=>state.signup.userInfo)
  const dispatch=useDispatch();
  const [data,setData]=useState({
    fname:"",
    lname:"",
    phno:"",
    email:"",
    password:"",
    newpassword:""
  })

  
  const { enqueueSnackbar } = useSnackbar();

  const handleShowToast = () => {
    // Basic usage
    enqueueSnackbar('Account Created Successfully',{variant:'success'});

    // Usage with variants (success, error, warning, info, default)
    // enqueueSnackbar('Action successful!', { variant: 'success' });
  };
  
  function changeHandler(e){
    const {name,value}=e.target;
    setData((prev)=>({
      ...prev,
      [name]:value
    }));
  }

  function submitHandler(e){
    e.preventDefault();
    //check if the email exists before
    const emailExists=users.some((user)=>user.emailId===data.email);
    if(emailExists){
      enqueueSnackbar("Email already exists use another email.Please Login",{variant:"warning"})
      return;
    }
    //check if the password are same
    if(data.password!==data.newpassword){
      toast.error("Password and new Password does not match")
      return;
    }
    
    //add the details
    dispatch(add({
      firstName:data.fname,
      lastName:data.lname,
      phNo:data.phno,
      emailId:data.email,
      password:data.password,
      confirmPassword:data.newpassword
    }))
    setData({
      fname:"",
      lname:"",
      phno:"",
      email:"",
      password:"",
      newpassword:""
    })
    handleShowToast()
  }
  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
  <div className='max-w-4xl bg-slate-900 mx-auto p-8 rounded-3xl opacity-95 transition-all duration-700 ease-in shadow-2xl border border-slate-800'>
    
    <h2 className='text-3xl font-bold text-center text-amber-400 mb-8 tracking-tight'>
      Create Your Account
    </h2>

    <div className='bg-slate-800 p-8 rounded-2xl shadow-inner'>
      <form onSubmit={submitHandler} className="space-y-6">
        
        {/* Row 1: Names */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <label className="flex flex-col gap-2">
            <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>First Name</span>
            <input
              type='text'
              name='fname'
              value={data.fname}
              onChange={changeHandler}
              placeholder='John'
              className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Last Name</span>
            <input
              type='text'
              name='lname'
              value={data.lname}
              onChange={changeHandler}
              placeholder='Doe'
              className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
            />
          </label>
        </div>

        {/* Row 2: Contact Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <label className="flex flex-col gap-2">
            <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Email Address</span>
            <input
              type='email'
              name='email'
              value={data.email}
              onChange={changeHandler}
              placeholder='abc@gmail.com'
              className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Phone Number</span>
            <input
              type='text'
              name='phno'
              value={data.phno}
              onChange={changeHandler}
              placeholder='8080808080'
              className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
            />
          </label>
        </div>

        {/* Row 3: Passwords */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <label className="flex flex-col gap-2">
            <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Password</span>
            <input
              type='password'
              name='password'
              value={data.password}
              onChange={changeHandler}
              placeholder='******'
              className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Confirm Password</span>
            <input
              type='password'
              name='newpassword'
              value={data.newpassword}
              onChange={changeHandler}
              placeholder='******'
              className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className='pt-4'>
          <button 
            type='submit'
            className='w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg text-lg'
          >
            Create My Account
          </button>
        </div>
      </form>
    </div>
    <NavLink to="/log-in">
      <p className='p-4 font-medium text-amber-400 shadow-2xl text-center'>Already Have an account<br/>Login In.</p>
    </NavLink>
  </div>
</div>
  )
}

export default SignUp
