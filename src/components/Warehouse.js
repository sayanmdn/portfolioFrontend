import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import {URL} from '../config'


export function Warehouse(props) {
    const auth = useSelector(state => state.auth)
    if(auth.isLoggedIn){
        var userId = auth.user.id
    }

    var [saveSuccess, setSaveSuccess] = useState(false)
    const formik = useFormik({
        initialValues: {
              data: '',
        },
        onSubmit: values => {
          axios.post(`${URL}user/save`, {userId: userId, data: values})
          .then(res => {

              //USERCREATED SUCCESS
              if(res.data.code === "dataSaved"){
                  setSaveSuccess(true)
                  alert("Data saved successfully")
              }

              console.log(res);
              // console.log(res.data);
          })
          .catch(error =>{
              console.log(error)
          })
          // alert(JSON.stringify(values));
        },
      });
    

    return (
        <div className="dataForm">
            <h2>HTTP Logger</h2>
            <Form className="data-form" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Anything you want to save</Form.Label>
                <Form.Control type="text" name="data" placeholder="Enter data" onChange={formik.handleChange} value={formik.values.data}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Data
            </Button>
            </Form>
        </div>
    )
}


// import React, { useState, useEffect } from 'react'
// import { Loginform } from "./forms/LoginForm";
// import axios from 'axios'
// import {URL} from '../config'
// import { useSelector, useDispatch } from "react-redux";


// export function Warehouse(props) {
// var [isValidToken, setIsValidToken] = useState(null)
// const auth = useSelector(state => state.auth)


// // console.log("Token is "+authToken)
// useEffect(()=>{
//     console.log("Useeffect using:221  "+ auth.user)
//     if(!auth.isLoggedIn){
//         const authToken = localStorage.getItem('token')
//         axios.post(`${URL}post/isAuthenticated`, {"token": authToken})
//         .then (res =>{
//             console.log(res)
//             if(res.data.code === "tokenValid"){
//                 console.log("res.data.code out: "+res.data.code)
//             }
//             setIsValidToken(res.data) 
//         })
//         setIsValidToken(true)
//     }
// },[auth])
// const removeToken = () =>{
//     localStorage.setItem('token', null)
//     setIsValidToken(null)
// }

// console.log("Valid token out: "+isValidToken)

//     if(!isValidToken) {return (
//         <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
//             <div style={{paddingTop:"10vh"}}></div>
//                 <Loginform/>
//         </div>
//     )} else {
//         return(
//             <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
//             <div style={{paddingTop:"10vh"}}></div>
//                 <h2>Hi, </h2>
//                 <h2>You are already loggedin</h2>
//                 <button onClick={removeToken}>Logout</button>
//         </div>
//         )
//     }
// }


