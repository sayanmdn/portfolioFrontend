import { BUY_CAKE } from "./actionTypes";

export const buyCake = () =>{
  return {
    type: BUY_CAKE
  }
}

export const initAuth = () => ({
  type: 'INIT_AUTH'
})