import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const users=useSelector((state)=>state.signup.userInfo)
  // console.log(users)
  const dispatch=useDispatch()
  return (
    <div>
      
    </div>
  )
}

export default Login
