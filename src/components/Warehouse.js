import React, { useState, useEffect } from 'react'
import { Loginform } from "./forms/LoginForm";
import axios from 'axios'
import {URL} from '../config'
import { useSelector, useDispatch } from "react-redux";


export function Warehouse(props) {
var [isValidToken, setIsValidToken] = useState(null)
const auth = useSelector(state => state.auth)


// console.log("Token is "+authToken)
useEffect(()=>{
    console.log("Useeffect using:221  "+ auth.user)
    if(!auth.isLoggedIn){
        const authToken = localStorage.getItem('token')
        axios.post(`${URL}post/isAuthenticated`, {"token": authToken})
        .then (res =>{
            console.log(res)
            if(res.data.code === "tokenValid"){
                console.log("res.data.code out: "+res.data.code)
            }
            setIsValidToken(res.data) 
        })
        setIsValidToken(true)
    }
},[auth])
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
                <h2>Hi, </h2>
                <h2>You are already loggedin</h2>
                <button onClick={removeToken}>Logout</button>
        </div>
        )
    }
}


