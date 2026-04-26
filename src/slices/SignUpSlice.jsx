import { createSlice } from "@reduxjs/toolkit";
//local storage
// const loadFromLocalStorage=()=>{
//     try{
//         const savedData=localStorage.getItem('users');
//         return savedData?JSON.parse(savedData):[]
//     }
//     catch(e){
//         return [];
//     }
// }
const initialState={
    userInfo:[]
}

export const SignUp=createSlice({
    name:'signup',
    initialState,
    reducers:{
        add:(state,action)=>{
            state.userInfo.push(action.payload)
            localStorage.setItem('users',JSON.stringify(state.userInfo))
        }

    }
})

export const {add}=SignUp.actions
export default SignUp.reducer