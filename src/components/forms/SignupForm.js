import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import axios from "axios";

export function SignupForm(props) {
    var [emailAlreadyExists, setemailAlreadyExists] = useState(false)
    var [signupSuccess, setSignupSuccess] = useState(false)
    var [passwordValidationError, setPasswordValidationError] = useState(null)

        // Pass the useFormik() hook initial form values and a submit function that will
        // be called when the form is submitted
        const formik = useFormik({
          initialValues: {
                email: '',
                name:'',
                password:''
          },
          onSubmit: values => {
            axios.post(`http://localhost:8000/user/signup`, values)
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
    if(signupSuccess) return (
        <div>
        <h2>Signup Successful</h2>
        <h3>Please try to login</h3>
        </div>
        )
        else return (
        <div>
            <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name="name" placeholder="Enter name" onChange={formik.handleChange} value={formik.values.name}/>
                <Form.Text className="text-muted" hidden={!emailAlreadyExists}>
                This email is already exists, try with another email
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={formik.handleChange} value={formik.values.email} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                <Form.Text className="text-muted" hidden={!passwordValidationError}>
                Error: {passwordValidationError}
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Signup
            </Button>
            </Form>
        </div>
    )
}
