import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initAuth } from "../../redux/actions";
import { URL } from "../../config";

export function Loginform(props) {
  var [loginSuccess, setLoginSuccess] = useState(false);
  var [authFailed, setAuthFailed] = useState(false);
  var [validationError, setValidationError] = useState(null);
  var [errorMessage, setErrorMessage] = useState(null);
  var [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useSelector(state => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // Reset all error states
      setAuthFailed(false);
      setValidationError(false);
      setErrorMessage(null);
      setIsLoading(true);

      axios
        .post(`${URL}user/login`, values)
        .then((res) => {
          // SUCCESS
          console.log("res: " + JSON.stringify(res));
          if (res.data.code === "Loggedin") {
            localStorage.setItem("token", res.data.token);
            setLoginSuccess(true);
            dispatch(initAuth(res.data.user));
            navigate("/warehouse");
          }
        })
        .catch((error) => {
          console.log("Error log: " + error);
          console.log("Error response: " + JSON.stringify(error.response));

          if (error.response) {
            const errorData = error.response.data;

            //VALIDATION ERROR
            if (errorData.code === "validationFalse") {
              setValidationError(true);
            }
            // FAILED - handle string responses
            else if (
              errorData === "Not valid password" ||
              errorData === "Email do not exists" ||
              errorData === "Email does not exist"
            ) {
              setAuthFailed(true);
            }
            // Handle any other error messages
            else if (typeof errorData === "string") {
              setErrorMessage(errorData);
            }
            // Handle object error responses
            else if (errorData.message) {
              setErrorMessage(errorData.message);
            }
            else {
              setErrorMessage("An error occurred during login. Please try again.");
            }
          } else if (error.request) {
            // Request was made but no response received
            setErrorMessage("Network error. Please check your connection and try again.");
          } else {
            // Something else happened
            setErrorMessage("An unexpected error occurred. Please try again.");
          }
        })
        .finally(() => {
          setIsLoading(false);
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
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </div>
          )}

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
              disabled={isLoading}
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
              disabled={isLoading}
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

          <button
            type="submit"
            className="btn-primary-glass w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    );
}
