import axios from 'axios';
import { URL } from '../../config';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);
  
  if (token && token !== 'null' && token !== null) {
    config.headers['auth-token'] = token;
    console.log('Added auth-token header:', token);
  } else {
    console.warn('No valid token found in localStorage');
  }
  
  console.log('Request headers:', config.headers);
  return config;
});

// Helper function to get token with fallbacks
const getAuthToken = () => {
  // Try different possible keys
  const tokenKeys = ['token', 'authToken', 'auth-token', 'accessToken'];
  
  for (const key of tokenKeys) {
    const token = localStorage.getItem(key);
    if (token && token !== 'null' && token !== 'undefined') {
      console.log(`Found token with key: ${key}`);
      return token;
    }
  }
  
  console.warn('No valid auth token found in localStorage');
  return null;
};

export const getPendingEvents = async (userId) => {
  try {
    console.log('Making request to:', `api/confirmation/pending/${userId}`);
    
    // Manually add auth token if interceptor failed
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['auth-token'] = token;
    }
    
    console.log('Request headers:', headers);
    
    const response = await apiClient.get(`api/confirmation/pending/${userId}`, { headers });
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error in getPendingEvents:', error.response?.data || error.message);
    console.error('Error status:', error.response?.status);
    console.error('Error headers:', error.response?.headers);
    throw error;
  }
};

export const updatePendingEvent = async (eventId, updates) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['auth-token'] = token;
    
    const response = await apiClient.put(`api/confirmation/update/${eventId}`, updates, { headers });
    return response.data;
  } catch (error) {
    console.error('API Error in updatePendingEvent:', error.response?.data || error.message);
    throw error;
  }
};

export const approveEvent = async (eventId) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['auth-token'] = token;
    
    const response = await apiClient.post(`api/confirmation/approve/${eventId}`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('API Error in approveEvent:', error.response?.data || error.message);
    throw error;
  }
};

export const rejectEvent = async (eventId) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['auth-token'] = token;
    
    const response = await apiClient.post(`api/confirmation/reject/${eventId}`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('API Error in rejectEvent:', error.response?.data || error.message);
    throw error;
  }
};