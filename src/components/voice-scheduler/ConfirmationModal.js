import React, { useState } from 'react';
import { approveEvent, rejectEvent } from '../../services/voice-scheduler/confirmationApi';

export const ConfirmationModal = ({ event, isOpen, onClose, onEventProcessed }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !event) return null;

  const formatDateTime = (dateString, timeString) => {
    if (timeString) {
      return new Date(`${dateString}T${timeString}`).toLocaleString();
    }
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

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await approveEvent(event._id);
      onEventProcessed(event._id, 'approved');
      onClose();
    } catch (error) {
      console.error('Error approving event:', error);
      alert('Failed to approve event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await rejectEvent(event._id);
      onEventProcessed(event._id, 'rejected');
      onClose();
    } catch (error) {
      console.error('Error rejecting event:', error);
      alert('Failed to reject event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isUncertainField = (field) => {
    return event.uncertainFields && event.uncertainFields.includes(field);
  };

  const getConfidenceColor = (score) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Confirm Event</h2>
              <p className="text-gray-600 mt-1">Please review and confirm the event details</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              disabled={isLoading}
            >
              ×
            </button>
          </div>

          {event.originalText && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Original Request:</h3>
              <p className="text-gray-600 italic">"{event.originalText}"</p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Event Details</h3>
              {event.confidenceScore && (
                <span className={`text-sm font-medium ${getConfidenceColor(event.confidenceScore)}`}>
                  Confidence: {Math.round(event.confidenceScore * 100)}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-3 rounded ${isUncertainField('title') ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <p className={`font-medium ${isUncertainField('title') ? 'text-yellow-700' : 'text-gray-800'}`}>
                  {event.title}
                </p>
              </div>

              <div className={`p-3 rounded ${isUncertainField('date') ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <p className={`font-medium ${isUncertainField('date') || isUncertainField('time') ? 'text-yellow-700' : 'text-gray-800'}`}>
                  {formatDateTime(event.date, event.time)}
                </p>
              </div>

              <div className={`p-3 rounded ${isUncertainField('duration') ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <p className={`font-medium ${isUncertainField('duration') ? 'text-yellow-700' : 'text-gray-800'}`}>
                  {formatDuration(event.duration)}
                </p>
              </div>

              {event.location && (
                <div className={`p-3 rounded ${isUncertainField('location') ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className={`font-medium ${isUncertainField('location') ? 'text-yellow-700' : 'text-gray-800'}`}>
                    {event.location}
                  </p>
                </div>
              )}
            </div>

            {event.description && (
              <div className={`p-3 rounded ${isUncertainField('description') ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className={`${isUncertainField('description') ? 'text-yellow-700' : 'text-gray-800'}`}>
                  {event.description}
                </p>
              </div>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <div className={`p-3 rounded ${isUncertainField('attendees') ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                <p className={`${isUncertainField('attendees') ? 'text-yellow-700' : 'text-gray-800'}`}>
                  {event.attendees.join(', ')}
                </p>
              </div>
            )}
          </div>

          {event.uncertainFields && event.uncertainFields.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Please Review</h4>
              <p className="text-yellow-700 text-sm">
                The following fields may need verification: <strong>{event.uncertainFields.join(', ')}</strong>
              </p>
              <p className="text-yellow-600 text-xs mt-1">
                You can edit these details in the Pending Events tab before confirming.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Edit Details
            </button>
            <button
              onClick={handleReject}
              disabled={isLoading}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Reject'}
            </button>
            <button
              onClick={handleApprove}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Approve & Create'}
            </button>
          </div>

          {event.expiresAt && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                This event will expire on {new Date(event.expiresAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};