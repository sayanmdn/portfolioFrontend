import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ssoAuthStart, ssoAuthFailure } from "../redux/actions";
import { ssoService } from "../services/ssoService";

export function SSOButton({ provider, children, style }) {
  const dispatch = useDispatch();
  const { ssoLoading } = useSelector(state => state.auth);

  const handleSSOLogin = async () => {
    dispatch(ssoAuthStart());
    
    try {
      await ssoService.initiateSSO(provider);
    } catch (error) {
      console.error('SSO Button error:', error);
      dispatch(ssoAuthFailure(error.message || "SSO login failed"));
    }
  };

  return (
    <Button
      variant="outline-primary"
      onClick={handleSSOLogin}
      disabled={ssoLoading}
      style={{
        width: "100%",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }}
    >
      {ssoLoading ? "Connecting..." : children}
    </Button>
  );
}

export function GoogleSSOButton({ style }) {
  return (
    <SSOButton provider="google" style={style}>
      <span style={{ marginRight: "8px" }}>🔍</span>
      Continue with Google
    </SSOButton>
  );
}

export function MicrosoftSSOButton({ style }) {
  return (
    <SSOButton provider="microsoft" style={style}>
      <span style={{ marginRight: "8px" }}>🔷</span>
      Continue with Microsoft
    </SSOButton>
  );
}

export function GenericSSOButton({ style }) {
  return (
    <SSOButton provider="generic" style={style}>
      <span style={{ marginRight: "8px" }}>🔐</span>
      Continue with SSO
    </SSOButton>
  );
}