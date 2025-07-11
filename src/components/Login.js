import { useState } from "react";
import { Loginform } from "./forms/LoginForm";
import { SSOLogin } from "./SSOLogin";
import { delAuth } from "../redux/actions";
import { useDispatch } from "react-redux";

export function Login(props) {
  const [isValidToken, setIsValidToken] = useState(null);
  const dispatch = useDispatch();

  const removeToken = () => {
    localStorage.setItem("token", null);
    setIsValidToken(null);
    dispatch(delAuth());
  };

  if (!isValidToken) {
    return (
      <div
        style={{
          background: "linear-gradient(#112233, #002222)",
          color: "white",
          textAlign: "center",
          height: "93vh",
        }}
      >
        <div style={{ paddingTop: "10vh" }}></div>
        <div style={{ marginBottom: "2rem" }}>
          <SSOLogin />
        </div>
        <div style={{ margin: "2rem 0", textAlign: "center" }}>
          <hr style={{ width: "50%", margin: "0 auto" }} />
          <span style={{ padding: "0 1rem", background: "linear-gradient(#112233, #002222)" }}>
            OR
          </span>
          <hr style={{ width: "50%", margin: "0 auto" }} />
        </div>
        <Loginform />
      </div>
    );
  } else {
    return (
      <div
        style={{
          background: "linear-gradient(#112233, #002222)",
          color: "white",
          textAlign: "center",
          height: "93vh",
        }}
      >
        <div style={{ paddingTop: "10vh" }}></div>
        <h2>Hi, {isValidToken.message.name}</h2>
        <h2>You are already loggedin</h2>
        <button onClick={removeToken}>Logout</button>
      </div>
    );
  }
}
