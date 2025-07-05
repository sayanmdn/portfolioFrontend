import { BUY_CAKE, SET_AUTH_USER, REMOVE_AUTH_USER, SSO_AUTH_START, SSO_AUTH_SUCCESS, SSO_AUTH_FAILURE } from "./actionTypes";

const initialState = {
  numOfCakes: 10,
};

export const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const initialAuth = {
  user: null,
  isLoggedIn: false,
  ssoLoading: false,
  ssoError: null,
};

export const authReducer = (state = initialAuth, action) => {
  const { type, payload } = action;

  switch (type) {
    case BUY_CAKE:
      return {
        ...state,
        user: {},
      };
    case SET_AUTH_USER:
      return {
        user: payload,
        isLoggedIn: true
      };
    case REMOVE_AUTH_USER:
      return{
        isLoggedIn:false,
        user: null,
        ssoLoading: false,
        ssoError: null
      };
    case SSO_AUTH_START:
      return {
        ...state,
        ssoLoading: true,
        ssoError: null
      };
    case SSO_AUTH_SUCCESS:
      return {
        user: payload,
        isLoggedIn: true,
        ssoLoading: false,
        ssoError: null
      };
    case SSO_AUTH_FAILURE:
      return {
        ...state,
        ssoLoading: false,
        ssoError: payload
      };
    default:
      return state;
  }
};
