import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initAuth } from "../../redux/actions";
import { URL } from "../../config";
import { GoogleSSOButton, MicrosoftSSOButton, GenericSSOButton } from "../SSOButton";

export function Loginform(props) {
  var [loginSuccess, setLoginSuccess] = useState(false);
  var [authFailed, setAuthFailed] = useState(false);
  var [validationError, setValidationError] = useState(null);
  let history = useHistory();
  let dispatch = useDispatch();
  const { ssoError } = useSelector(state => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${URL}user/login`, values)
        .then((res) => {
          // SUCCESS
          console.log("res: " + JSON.stringify(res));
          if (res.data.code === "Loggedin") {
            localStorage.setItem("token", res.data.token);
            setLoginSuccess(true);
            dispatch(initAuth(res.data.user));
            history.push("/warehouse");
          }
        })
        .catch((error) => {
          console.log("Error log: " + error);
          //   console.log("Error log: "+ JSON.stringify(error.response))
          // console.log("Error log: "+ error.response.data.code)

          //VALIDATION ERROR
          if (error.response.data.code === "validationFalse") {
            // setValidationError(res.data.message)
            setValidationError(true);
          }
          // FAILED
          if (
            error.response.data === "Not valid password" ||
            error.response.data === "Email do not exists"
          ) {
            setAuthFailed(true);
          }
        });
      // alert(JSON.stringify(values));
    },
  });
  if (loginSuccess) {
    return (
      <div className="glass-card max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold text-center text-text-primary">Login Successful</h2>
      </div>
    );
  } else
    return (
      <div className="max-w-md mx-auto mt-8">
        <form className="glass-card" onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="input-glass w-full"
            />
            <p className="text-text-muted text-sm mt-2">
              Your information will be kept confidential.
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="input-glass w-full"
            />
            {authFailed && (
              <p className="text-red-400 text-sm mt-2">
                Email or password is wrong
              </p>
            )}
            {validationError && (
              <p className="text-red-400 text-sm mt-2">
                Must be valid Email and password should be min 8 characters long
              </p>
            )}
          </div>
          
          <button type="submit" className="btn-primary-glass w-full">
            Login
          </button>
        </form>
      </div>
    );
}
