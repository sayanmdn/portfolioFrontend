import React, { useState, useRef } from 'react';

export const VoiceRecorder = ({
  onAudioRecorded,
  isProcessing,
  disabled = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        convertBlobToBase64(audioBlob);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const convertBlobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Remove data URL prefix to get pure base64
      const base64Data = base64String.split(',')[1];
      onAudioRecorded(base64Data);
    };
    reader.readAsDataURL(blob);
  };

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const getButtonText = () => {
    if (isProcessing) return 'Processing...';
    if (isRecording) return 'Stop Recording';
    return 'Start Recording';
  };

  const getButtonClass = () => {
    let baseClass = 'voice-recorder-button';
    if (isRecording) baseClass += ' recording';
    if (isProcessing || disabled) baseClass += ' disabled';
    return baseClass;
  };

  return (
    <div className="voice-recorder">
      <button
        className={getButtonClass()}
        onClick={handleButtonClick}
        disabled={isProcessing || disabled}
        type="button"
      >
        {isRecording && <span className="recording-indicator">🔴</span>}
        {getButtonText()}
      </button>
      {isRecording && (
        <div className="recording-status">
          <span className="pulse-dot"></span>
          Recording in progress...
        </div>
      )}
    </div>
  );
};