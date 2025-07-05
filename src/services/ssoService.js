import axios from "axios";
import { URL } from "../config";

export const ssoService = {
  getAuthorizationUrl: async (provider, redirectUri) => {
    try {
      const response = await axios.get(`${URL}user/sso/authorize`, {
        params: {
          provider,
          redirect_uri: redirectUri,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  handleCallback: async (code, state) => {
    try {
      const response = await axios.post(`${URL}user/sso/callback`, {
        code,
        state,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserProfile: async (token) => {
    try {
      const response = await axios.get(`${URL}user/sso/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getConnections: async (token) => {
    try {
      const response = await axios.get(`${URL}user/sso/connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  initiateSSO: async (provider) => {
    const redirectUri = `${window.location.origin}/sso/callback`;
    console.log('Redirect URI being sent:', redirectUri);
    
    try {
      const data = await ssoService.getAuthorizationUrl(provider, redirectUri);
      console.log('SSO Authorization response:', data);
      
      if (data.authorizationURL || data.authorization_url) {
        window.location.href = data.authorizationURL || data.authorization_url;
      } else {
        throw new Error('No authorization URL received from server');
      }
    } catch (error) {
      console.error('SSO initiation error:', error);
      throw error;
    }
  },
};