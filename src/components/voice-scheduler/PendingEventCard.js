import React, { useState } from 'react';
import { updatePendingEvent, approveEvent, rejectEvent } from '../../services/voice-scheduler/confirmationApi';

export const PendingEventCard = ({ event, onEventUpdated, onEventProcessed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    date: event.date,
    time: event.time,
    duration: event.duration,
    location: event.location || '',
    description: event.description || '',
    attendees: event.attendees || []
  });


  const formatDuration = (duration) => {
    if (duration >= 60) {
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${duration}m`;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      duration: event.duration,
      location: event.location || '',
      description: event.description || '',
      attendees: event.attendees || []
    });
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      const updates = {};
      if (editedEvent.title !== event.title) updates.title = editedEvent.title;
      if (editedEvent.date !== event.date) updates.date = editedEvent.date;
      if (editedEvent.time !== event.time) updates.time = editedEvent.time;
      if (editedEvent.duration !== event.duration) updates.duration = parseInt(editedEvent.duration);
      if (editedEvent.location !== event.location) updates.location = editedEvent.location;
      if (editedEvent.description !== event.description) updates.description = editedEvent.description;
      if (JSON.stringify(editedEvent.attendees) !== JSON.stringify(event.attendees)) {
        updates.attendees = editedEvent.attendees.filter(email => email.trim());
      }

      if (Object.keys(updates).length > 0) {
        await updatePendingEvent(event._id, updates);
        onEventUpdated();
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await approveEvent(event._id);
      onEventProcessed(event._id, 'approved');
    } catch (error) {
      console.error('Error approving event:', error);
      alert('Failed to approve event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this event? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        await rejectEvent(event._id);
        onEventProcessed(event._id, 'rejected');
      } catch (error) {
        console.error('Error rejecting event:', error);
        alert('Failed to reject event. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAttendeesChange = (value) => {
    const attendeesList = value.split(',').map(email => email.trim());
    setEditedEvent({ ...editedEvent, attendees: attendeesList });
  };

  const getConfidenceColor = (score) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isUncertainField = (field) => {
    return event.uncertainFields && event.uncertainFields.includes(field);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                value={editedEvent.title}
                onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                className={`border rounded px-2 py-1 text-lg font-semibold ${isUncertainField('title') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
              />
            ) : (
              <span className={isUncertainField('title') ? 'text-yellow-600' : ''}>{event.title}</span>
            )}
          </h3>
          {event.confidenceScore && (
            <span className={`text-sm font-medium ${getConfidenceColor(event.confidenceScore)}`}>
              {Math.round(event.confidenceScore * 100)}%
            </span>
          )}
        </div>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
          Pending
        </span>
      </div>

      {event.originalText && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            <strong>Original request:</strong> "{event.originalText}"
          </p>
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            {isEditing ? (
              <input
                type="date"
                value={editedEvent.date}
                onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                className={`border rounded px-3 py-2 w-full ${isUncertainField('date') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
              />
            ) : (
              <p className={`text-gray-800 ${isUncertainField('date') ? 'text-yellow-600' : ''}`}>
                {new Date(event.date).toLocaleDateString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            {isEditing ? (
              <input
                type="time"
                value={editedEvent.time}
                onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
                className={`border rounded px-3 py-2 w-full ${isUncertainField('time') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
              />
            ) : (
              <p className={`text-gray-800 ${isUncertainField('time') ? 'text-yellow-600' : ''}`}>
                {event.time}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            {isEditing ? (
              <input
                type="number"
                value={editedEvent.duration}
                onChange={(e) => setEditedEvent({ ...editedEvent, duration: e.target.value })}
                min="15"
                max="1440"
                className={`border rounded px-3 py-2 w-full ${isUncertainField('duration') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
              />
            ) : (
              <p className={`text-gray-800 ${isUncertainField('duration') ? 'text-yellow-600' : ''}`}>
                {formatDuration(event.duration)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={editedEvent.location}
                onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                placeholder="Enter location"
                className={`border rounded px-3 py-2 w-full ${isUncertainField('location') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
              />
            ) : (
              <p className={`text-gray-800 ${isUncertainField('location') ? 'text-yellow-600' : ''}`}>
                {event.location || 'No location specified'}
              </p>
            )}
          </div>
        </div>

        {(event.attendees?.length > 0 || isEditing) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
            {isEditing ? (
              <input
                type="text"
                value={editedEvent.attendees.join(', ')}
                onChange={(e) => handleAttendeesChange(e.target.value)}
                placeholder="Enter email addresses separated by commas"
                className={`border rounded px-3 py-2 w-full ${isUncertainField('attendees') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
              />
            ) : (
              <p className={`text-gray-800 ${isUncertainField('attendees') ? 'text-yellow-600' : ''}`}>
                {event.attendees?.join(', ') || 'No attendees'}
              </p>
            )}
          </div>
        )}

        {(event.description || isEditing) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            {isEditing ? (
              <textarea
                value={editedEvent.description}
                onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                placeholder="Enter description"
                rows="3"
                className={`border rounded px-3 py-2 w-full ${isUncertainField('description') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
              />
            ) : (
              <p className={`text-gray-800 ${isUncertainField('description') ? 'text-yellow-600' : ''}`}>
                {event.description || 'No description'}
              </p>
            )}
          </div>
        )}
      </div>

      {event.uncertainFields && event.uncertainFields.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Uncertain fields:</strong> {event.uncertainFields.join(', ')}
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            Please review and edit these fields if needed before approving.
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        {isEditing ? (
          <>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              disabled={isLoading}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleReject}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Reject'}
            </button>
            <button
              onClick={handleApprove}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Approve'}
            </button>
          </>
        )}
      </div>

      {event.expiresAt && (
        <div className="mt-4 text-xs text-gray-500">
          Expires: {new Date(event.expiresAt).toLocaleString()}
        </div>
      )}
    </div>
  );
};