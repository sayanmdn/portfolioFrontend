import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from "axios";
import {URL} from '../../config'


export function SignupForm(props) {
    var [emailAlreadyExists, setemailAlreadyExists] = useState(false)
    var [signupSuccess, setSignupSuccess] = useState(false)
    var [passwordValidationError, setPasswordValidationError] = useState(null)
    const [otpSentSuccessfully, setOtpSentSuccessfully] = useState(false)

        // Pass the useFormik() hook initial form values and a submit function that will
        // be called when the form is submitted
        const formik = useFormik({
          initialValues: {
                email: '',
                name:'',
                password:'',
                otp:''
          },
          onSubmit: values => {
            axios.post(`${URL}user/signup`, values)
            .then(res => {
                if(res.data === "Email already exists"){
                    setemailAlreadyExists(true)
                }

                //USERCREATED SUCCESS
                if(res.data.code === "userCreated"){
                    setSignupSuccess(true)
                    // alert("signup success")
                }

                //validationFalse
                if(res.data.code === "validationFalse"){
                    // setValidationError(res.data.message)
                    let msg = res.data.message
                    let result = msg.search("password")
                    if (result) setPasswordValidationError(msg)
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
        const sendOTP = ()=>{
            let email = formik.values.email
            console.log("Email provided to send otp "+email)
            axios.post(`${URL}user/otpsend`, {email})
            .then(res=>{
                console.log("Email Sent response 1 "+JSON.stringify(res))
                if(res.data.code == "otpSent"){
                    console.log("Email Sent response 2 "+res)
                    setOtpSentSuccessfully(true)
                    alert("OTP Sent Successfully to your Email")
                }
            })
        }
    if(signupSuccess) return (
        <div className="glass-card max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold text-center text-text-primary mb-4">Signup Successful</h2>
            <h3 className="text-lg text-center text-text-secondary">Please try to login</h3>
        </div>
        )
        else return (
        <div className="max-w-md mx-auto mt-8">
            <form className="glass-card" onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        placeholder="Enter name" 
                        onChange={formik.handleChange} 
                        value={formik.values.name}
                        className="input-glass w-full"
                    />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email address</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Enter email" 
                        name="email" 
                        readOnly={otpSentSuccessfully} 
                        onChange={formik.handleChange} 
                        value={formik.values.email}
                        className="input-glass w-full"
                    />
                    {emailAlreadyExists && (
                        <p className="text-red-400 text-sm mt-2">
                            This email already exists, try with another email
                        </p>
                    )}
                    <div className="mt-3">
                        {!otpSentSuccessfully && (
                            <button 
                                type="button"
                                onClick={sendOTP} 
                                className="btn-glass text-sm"
                            >
                                Send OTP to my email
                            </button>
                        )}
                    </div>
                </div>
                
                <div className="mb-6">
                    <label htmlFor="otp" className="block text-sm font-medium text-text-secondary mb-2">OTP</label>
                    <input 
                        type="text" 
                        id="otp"
                        name="otp" 
                        placeholder="Enter otp" 
                        onChange={formik.handleChange} 
                        value={formik.values.otp}
                        className="input-glass w-full"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password" 
                        name="password" 
                        onChange={formik.handleChange} 
                        value={formik.values.password}
                        className="input-glass w-full"
                    />
                    {passwordValidationError && (
                        <p className="text-red-400 text-sm mt-2">
                            Error: {passwordValidationError}
                        </p>
                    )}
                </div>
                
                <button type="submit" className="btn-primary-glass w-full">
                    Signup
                </button>
            </form>
        </div>
    )
}
