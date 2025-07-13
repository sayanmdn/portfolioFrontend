import axios from 'axios';
import { URL } from '../../config';

// Configure API base URL using the project's config
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && token !== 'null') {
    config.headers['auth-token'] = token;
  }
  return config;
});

// API Functions
export const processAudio = async (audioData, userId) => {
  const response = await apiClient.post('api/voice/process-audio', {
    audioData,
    userId,
  });
  
  // Transform the response to match expected format
  const data = response.data;
  
  // Handle different response types
  let message = '';
  if (data.status === 'confirmation_required') {
    message = 'Event needs confirmation. Please review in Pending Events.';
  } else if (data.status === 'clarification_needed') {
    message = data.clarificationQuestion || 'Please provide more details.';
  } else if (data.status === 'created') {
    message = `Event "${data.event?.title || 'New Event'}" has been created successfully`;
  } else {
    message = data.message || 'Request processed';
  }
  
  return {
    success: true,
    type: data.status || 'created',
    data: data.event || data.pendingEvent,
    message: message,
    transcription: data.transcription,
    clarificationQuestion: data.clarificationQuestion
  };
};

export const processText = async (text, userId) => {
  const response = await apiClient.post('api/voice/process-text', {
    text,
    userId,
  });
  
  // Transform the response to match expected format
  const data = response.data;
  
  // Handle different response types
  let message = '';
  if (data.status === 'confirmation_required') {
    message = 'Event needs confirmation. Please review in Pending Events.';
  } else if (data.status === 'clarification_needed') {
    message = data.clarificationQuestion || 'Please provide more details.';
  } else if (data.status === 'created') {
    message = `Event "${data.event?.title || 'New Event'}" has been created successfully`;
  } else {
    message = data.message || 'Request processed';
  }
  
  return {
    success: true,
    type: data.status || 'created',
    data: data.event || data.pendingEvent,
    message: message,
    transcription: data.transcription,
    clarificationQuestion: data.clarificationQuestion
  };
};

export const getPendingEvents = async (userId) => {
  const response = await apiClient.post('api/voice/pending-events', {
    userId,
  });
  return response.data;
};

export const getCalendarEvents = async (userId) => {
  const response = await apiClient.get(`api/calendar/events/${userId}`);
  return response.data.events || [];
};

export const createCalendarEvent = async (eventData) => {
  const response = await apiClient.post('api/calendar/create-event', eventData);
  return response.data;
};

export const approveEvent = async (eventId, userId) => {
  const response = await apiClient.post(`api/confirmation/approve/${eventId}`, {
    userId,
  });
  return response.data;
};

export const rejectEvent = async (eventId, userId) => {
  const response = await apiClient.post(`api/confirmation/reject/${eventId}`, {
    userId,
  });
  return response.data;
};

export const updatePendingEvent = async (eventId, userId, updateData) => {
  const response = await apiClient.put(`api/confirmation/update/${eventId}`, {
    userId,
    updateData,
  });
  return response.data;
};

export const healthCheck = async () => {
  const response = await apiClient.get('api/health');
  return response.data;
};