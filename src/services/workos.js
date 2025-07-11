// import { WorkOS } from '@workos-inc/authkit-js';

// const workos = new WorkOS(process.env.REACT_APP_WORKOS_CLIENT_ID);

export const workosService = {
  signUp: async (options = {}) => {
    console.log('WorkOS not available - sign up disabled');
    return Promise.reject(new Error('WorkOS service disabled'));
  },

  signIn: async (options = {}) => {
    console.log('WorkOS not available - sign in disabled');
    return Promise.reject(new Error('WorkOS service disabled'));
  },

  getUser: async () => {
    console.log('WorkOS not available - get user disabled');
    return Promise.reject(new Error('WorkOS service disabled'));
  },

  signOut: async () => {
    console.log('WorkOS not available - sign out disabled');
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  isAuthenticated: async () => {
    console.log('WorkOS not available - authentication disabled');
    return false;
  }
};

export default workosService;