import { BUY_CAKE, SET_AUTH_USER, REMOVE_AUTH_USER, SSO_AUTH_START, SSO_AUTH_SUCCESS, SSO_AUTH_FAILURE } from "./actionTypes";

export const buyCake = () =>{
  return {
    type: BUY_CAKE
  }
}

export const initAuth = (userObj) => {
  return {
    type: SET_AUTH_USER,
    payload: userObj
  }
}

export const delAuth = () => {
  return {
    type: REMOVE_AUTH_USER,
  }
}

export const ssoAuthStart = () => {
  return {
    type: SSO_AUTH_START,
  }
}

export const ssoAuthSuccess = (userObj) => {
  return {
    type: SSO_AUTH_SUCCESS,
    payload: userObj
  }
}

export const ssoAuthFailure = (error) => {
  return {
    type: SSO_AUTH_FAILURE,
    payload: error
  }
}
