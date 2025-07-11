import React from 'react'
import { SignupForm } from "./forms/SignupForm";

export function Signup(props) {
    return (
        <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
            <div style={{paddingTop:"10vh"}}></div>
                <SignupForm/>
        </div>
    )
}
