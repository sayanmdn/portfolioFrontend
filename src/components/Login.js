import React, { useEffect, useState } from 'react'
import { Loginform } from "./forms/LoginForm";
import axios from 'axios'
import { addCount } from "../redux/actions";
import {useDispatch} from "react-redux"

// import isAlreadyLoggedIn from "./isAlreadyLoggedIn";
// const logger = isAlreadyLoggedIn()


export function Login(props) {
const [isValidToken, setIsValidToken] = useState(null)
const dispatch = useDispatch()
// console.log("Token is "+authToken)
useEffect(()=>{
    const authToken = localStorage.getItem('token')
    axios.post(`http://localhost:8000/post/isAuthenticated`, {"token": authToken})
    .then (res =>{
        console.log(res)
        if(res.data.code === "tokenValid"){
            console.log("res.data out: "+ JSON.stringify(res.data.message))
            // dispatch(addCount())
            setIsValidToken(res.data) 
        }
    })
},[])
const removeToken = () =>{
    localStorage.setItem('token', null)
    setIsValidToken(null)
}

console.log("Valid token out: "+isValidToken)

    if(!isValidToken) {return (
        <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
            <div style={{paddingTop:"10vh"}}></div>
                <Loginform/>
        </div>
    )} else {
        return(
            <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
            <div style={{paddingTop:"10vh"}}></div>
                <h2>Hi, {isValidToken.message.name}</h2>
                <h2>You are already loggedin</h2>
                <button onClick={removeToken}>Logout</button>
        </div>
        )
    }
}


