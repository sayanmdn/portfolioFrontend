import React, { useState } from 'react'
import { Loginform } from "./forms/LoginForm";
import axios from 'axios'

// import isAlreadyLoggedIn from "./isAlreadyLoggedIn";
// const logger = isAlreadyLoggedIn()


export function Login(props) {
var [isValidToken, setIsValidToken] = useState(null)
const values = localStorage.getItem('token')
console.log("Token is "+values)
axios.post(`http://localhost:8000/post/isAuthenticated`, {"token": values})
.then (res =>{
    console.log(res)
    if(res.data.code === "tokenValid"){
        console.log("res.data.code out: "+res.data.code)
        setIsValidToken(res.data.code) 
    }
})

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
                <h2>You are already loggedin</h2>
                <button onClick={removeToken}>Logout</button>
        </div>
        )
    }
}


