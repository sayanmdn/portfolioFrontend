import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ssoAuthSuccess, ssoAuthFailure } from "../redux/actions";
import { ssoService } from "../services/ssoService";

export function SSOCallback() {
  const [status, setStatus] = useState("processing");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const state = params.get("state");
        const error = params.get("error");

        if (error) {
          throw new Error(error);
        }

        if (!code) {
          throw new Error("No authorization code received");
        }

        setStatus("authenticating");
        
        const response = await ssoService.handleCallback(code, state);
        
        if (response.token) {
          localStorage.setItem("token", response.token);
          dispatch(ssoAuthSuccess(response.user));
          setStatus("success");
          
          setTimeout(() => {
            history.push("/warehouse");
          }, 1000);
        } else {
          throw new Error("No token received from SSO");
        }
      } catch (error) {
        console.error("SSO callback error:", error);
        dispatch(ssoAuthFailure(error.message));
        setStatus("error");
        
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      }
    };

    handleCallback();
  }, [location.search, history, dispatch]);

  const renderContent = () => {
    switch (status) {
      case "processing":
        return (
          <div>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <h3>Processing SSO login...</h3>
          </div>
        );
      case "authenticating":
        return (
          <div>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <h3>Authenticating...</h3>
          </div>
        );
      case "success":
        return (
          <div>
            <h3>✅ Login successful!</h3>
            <p>Redirecting to your dashboard...</p>
          </div>
        );
      case "error":
        return (
          <div>
            <h3>❌ Login failed</h3>
            <p>Redirecting to login page...</p>
          </div>
        );
      default:
        return <div>Unknown status</div>;
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(#112233, #002222)",
        color: "white",
        textAlign: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {renderContent()}
    </div>
  );
}