import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VoiceRecorder } from '../../components/voice-scheduler/VoiceRecorder';
import { PendingEventCard } from '../../components/voice-scheduler/PendingEventCard';
import { ConfirmationModal } from '../../components/voice-scheduler/ConfirmationModal';
import {
  processAudio,
  processText,
  getCalendarEvents,
} from '../../services/voice-scheduler/voiceApi';
import { getPendingEvents } from '../../services/voice-scheduler/confirmationApi';

export const SearchEventsPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loadingPendingEvents, setLoadingPendingEvents] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingEventForConfirmation, setPendingEventForConfirmation] = useState(null);
  const auth = useSelector(state => state.auth);
  const userId = auth.user?.id || '';

  const handleAudioRecorded = async (audioData) => {
    if (!auth.isLoggedIn || !userId) {
      setError('Please log in to create events');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResponse(null);

    try {
      const result = await processAudio(audioData, userId);
      setResponse(result);
      
      // If confirmation is required, fetch pending events and show modal
      if (result.type === 'confirmation_required') {
        const pendingResult = await handleViewPendingEvents();
        // Show the most recent pending event in modal
        if (pendingResult && pendingResult.length > 0) {
          const latestEvent = pendingResult[0]; // Assuming the latest is first
          setPendingEventForConfirmation(latestEvent);
          setShowConfirmationModal(true);
        }
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      setError('Failed to process audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    
    if (!textInput.trim()) {
      setError('Please enter some text');
      return;
    }

    if (!auth.isLoggedIn || !userId) {
      setError('Please log in to create events');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResponse(null);

    try {
      const result = await processText(textInput, userId);
      setResponse(result);
      setTextInput('');
      
      // If confirmation is required, fetch pending events and show modal
      if (result.type === 'confirmation_required') {
        const pendingResult = await handleViewPendingEvents();
        // Show the most recent pending event in modal
        if (pendingResult && pendingResult.length > 0) {
          const latestEvent = pendingResult[0]; // Assuming the latest is first
          setPendingEventForConfirmation(latestEvent);
          setShowConfirmationModal(true);
        }
      }
    } catch (error) {
      console.error('Error processing text:', error);
      setError('Failed to process text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewEvents = async () => {
    if (!auth.isLoggedIn || !userId) {
      setError('Please log in to view events');
      return;
    }

    setLoadingEvents(true);
    setError('');

    try {
      const userEvents = await getCalendarEvents(userId);
      setEvents(userEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events. Please try again.');
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleViewPendingEvents = async () => {
    if (!auth.isLoggedIn || !userId) {
      setError('Please log in to view pending events');
      return [];
    }

    setLoadingPendingEvents(true);
    setError('');

    try {
      const result = await getPendingEvents(userId);
      const events = result.events || [];
      setPendingEvents(events);
      return events;
    } catch (error) {
      console.error('Error fetching pending events:', error);
      setError('Failed to fetch pending events. Please try again.');
      setPendingEvents([]);
      return [];
    } finally {
      setLoadingPendingEvents(false);
    }
  };

  const handleEventUpdated = () => {
    handleViewPendingEvents();
  };

  const handleEventProcessed = (eventId, action) => {
    setPendingEvents(prev => prev.filter(event => event._id !== eventId));
    if (action === 'approved') {
      handleViewEvents();
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setPendingEventForConfirmation(null);
    // Switch to pending events tab to allow editing
    setActiveTab('pending');
  };

  const handleModalEventProcessed = (eventId, action) => {
    handleEventProcessed(eventId, action);
    setShowConfirmationModal(false);
    setPendingEventForConfirmation(null);
  };

  useEffect(() => {
    if (auth.isLoggedIn && userId) {
      if (activeTab === 'pending') {
        handleViewPendingEvents();
      } else if (activeTab === 'calendar') {
        handleViewEvents();
      }
      // Load summary data regardless of tab
      if (pendingEvents.length === 0) {
        handleViewPendingEvents();
      }
      if (events.length === 0) {
        handleViewEvents();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn, userId, activeTab]);


  const formatDateTime = (dateString, timeString) => {
    if (timeString) {
      // Handle API format with separate date and time
      return new Date(`${dateString}T${timeString}`).toLocaleString();
    }
    // Handle standard ISO format
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (duration) => {
    if (duration >= 60) {
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${duration}m`;
  };

  return (
    <div className="search-events-page">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Voice Calendar Scheduler</h1>
        

        {/* Event Summary */}
        {auth.isLoggedIn && userId && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Event Summary</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="text-gray-700">
                  Pending Events: <strong>{pendingEvents.length}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="text-gray-700">
                  Calendar Events: <strong>{events.length}</strong>
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleViewPendingEvents}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Refresh Pending
                </button>
                <span className="text-gray-400">|</span>
                <button
                  onClick={handleViewEvents}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Refresh Calendar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('create')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'create'
                    ? 'border-black text-black'
                    : 'border-transparent text-black hover:text-gray-800 hover:border-gray-400'
                }`}
              >
                Create Events
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-black text-black'
                    : 'border-transparent text-black hover:text-gray-800 hover:border-gray-400'
                }`}
              >
                Pending Events
                {pendingEvents.length > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    {pendingEvents.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calendar'
                    ? 'border-black text-black'
                    : 'border-transparent text-black hover:text-gray-800 hover:border-gray-400'
                }`}
              >
                Calendar Events
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content Container with Animation */}
        <div className="relative overflow-hidden">
          {/* Create Events Tab */}
          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === 'create' 
              ? 'opacity-100 transform translate-x-0' 
              : 'opacity-0 transform translate-x-full absolute inset-0 pointer-events-none'
          }`}>
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">Voice Input</h3>
                  <VoiceRecorder
                    onAudioRecorded={handleAudioRecorded}
                    isProcessing={isProcessing}
                    disabled={!userId.trim()}
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">Text Input</h3>
                  <form onSubmit={handleTextSubmit} className="space-y-4">
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Describe your event (e.g., 'Schedule a meeting with John tomorrow at 2 PM')"
                      rows={4}
                      disabled={isProcessing || !auth.isLoggedIn || !userId}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={isProcessing || !textInput.trim() || !auth.isLoggedIn || !userId}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Create Event'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Response Display for Create Tab */}
        {activeTab === 'create' && response && (
          <div className={`mb-6 p-6 rounded-lg border ${
            response.type === 'created' ? 'bg-green-50 border-green-200' :
            response.type === 'confirmation_required' ? 'bg-orange-50 border-orange-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              response.type === 'created' ? 'text-green-800' :
              response.type === 'confirmation_required' ? 'text-orange-800' :
              'text-blue-800'
            }`}>Response</h3>
            <div className="space-y-3">
              <p className={`font-medium ${
                response.type === 'created' ? 'text-green-700' :
                response.type === 'confirmation_required' ? 'text-orange-700' :
                'text-blue-700'
              }`}>
                <strong>Status:</strong> {response.type.replace('_', ' ').toUpperCase()}
              </p>
              {response.message && (
                <p className="text-gray-800">
                  <strong>Message:</strong> {response.message}
                </p>
              )}
              {response.transcription && (
                <p className="text-gray-800">
                  <strong>Transcription:</strong> "{response.transcription}"
                </p>
              )}
              {response.clarificationQuestion && (
                <p className="text-gray-800">
                  <strong>Question:</strong> {response.clarificationQuestion}
                </p>
              )}
              {response.data && (
                <div className="mt-4 p-4 bg-white rounded border shadow-sm">
                  <h4 className="font-semibold mb-3 text-gray-800">Event Details:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700"><strong>Title:</strong> {response.data.title || 'Not specified'}</p>
                    <p className="text-gray-700"><strong>Date & Time:</strong> {formatDateTime(response.data.date, response.data.time)}</p>
                    <p className="text-gray-700"><strong>Duration:</strong> {formatDuration(response.data.duration)}</p>
                    {response.data.location && <p className="text-gray-700"><strong>Location:</strong> {response.data.location}</p>}
                    {response.data.description && <p className="text-gray-700"><strong>Description:</strong> {response.data.description}</p>}
                    {response.data.attendees && response.data.attendees.length > 0 && (
                      <p className="text-gray-700"><strong>Attendees:</strong> {response.data.attendees.join(', ')}</p>
                    )}
                    {response.data.confidenceScore && (
                      <p className="text-gray-700"><strong>Confidence:</strong> {Math.round(response.data.confidenceScore * 100)}%</p>
                    )}
                  </div>
                </div>
              )}
              {response.type === 'confirmation_required' && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('pending')}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-medium"
                  >
                    Go to Pending Events
                  </button>
                  <button
                    onClick={handleViewPendingEvents}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                  >
                    Refresh Pending Events
                  </button>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                  >
                    View Calendar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

          {/* Pending Events Tab */}
          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === 'pending' 
              ? 'opacity-100 transform translate-x-0' 
              : activeTab === 'create' 
                ? 'opacity-0 transform -translate-x-full absolute inset-0 pointer-events-none'
                : 'opacity-0 transform translate-x-full absolute inset-0 pointer-events-none'
          }`}>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Pending Events</h2>
                <button
                  onClick={handleViewPendingEvents}
                  disabled={loadingPendingEvents || !auth.isLoggedIn || !userId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPendingEvents ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {loadingPendingEvents ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : pendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {pendingEvents.map((event) => (
                    <PendingEventCard
                      key={event._id}
                      event={event}
                      onEventUpdated={handleEventUpdated}
                      onEventProcessed={handleEventProcessed}
                    />
                  ))}
                </div>
              ) : auth.isLoggedIn && userId ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No pending events found.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Events that require confirmation will appear here.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Please log in to view pending events.</p>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Events Tab */}
          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === 'calendar' 
              ? 'opacity-100 transform translate-x-0' 
              : 'opacity-0 transform -translate-x-full absolute inset-0 pointer-events-none'
          }`}>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Your Calendar Events</h2>
                <button
                  onClick={handleViewEvents}
                  disabled={loadingEvents || !auth.isLoggedIn || !userId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingEvents ? 'Loading...' : 'Refresh'}
                </button>
              </div>

            {loadingEvents ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : events.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {events.map((event, index) => (
                    <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-900 truncate">
                                {event.title}
                              </h4>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {formatDateTime(event.date, event.time)}
                                </span>
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {formatDuration(event.duration)}
                                </span>
                                {event.attendees && event.attendees.length > 0 && (
                                  <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.694" />
                                    </svg>
                                    {event.attendees.length} attendee{event.attendees.length > 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                              {event.description && (
                                <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                                  {event.description}
                                </p>
                              )}
                              {event.attendees && event.attendees.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500">
                                    <strong>Attendees:</strong> {event.attendees.join(', ')}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : auth.isLoggedIn && userId ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No calendar events found.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Create your first event using voice or text input!
                </p>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Please log in to view calendar events.</p>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          event={pendingEventForConfirmation}
          isOpen={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onEventProcessed={handleModalEventProcessed}
        />
      </div>
    </div>
  );
};