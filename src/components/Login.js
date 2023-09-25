import React, { useEffect, useState } from "react";
import { Loginform } from "./forms/LoginForm";
import { delAuth, initAuth } from "../redux/actions";
import axios from "axios";
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
