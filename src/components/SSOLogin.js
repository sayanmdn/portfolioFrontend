import React, { useState } from 'react';
import workosService from '../services/workos';

export function SSOLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSSOLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await workosService.signIn();
    } catch (err) {
      setError('Failed to initiate SSO login. Please try again.');
      console.error('SSO Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSSOSignup = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await workosService.signUp();
    } catch (err) {
      setError('Failed to initiate SSO signup. Please try again.');
      console.error('SSO Signup Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="glass-card max-w-md mx-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white text-center mb-6">Single Sign-On</h2>
          
          {error && (
            <div className="alert-glass alert-danger mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <button
              className="btn-primary-glass w-full text-lg py-3"
              onClick={handleSSOLogin}
              disabled={loading}
            >
              {loading ? 'Redirecting...' : 'Sign In with SSO'}
            </button>
            
            <button
              className="btn-secondary-glass w-full text-lg py-3"
              onClick={handleSSOSignup}
              disabled={loading}
            >
              {loading ? 'Redirecting...' : 'Sign Up with SSO'}
            </button>
          </div>
          
          <div className="text-center mt-6">
            <small className="text-text-secondary">
              You'll be redirected to your organization's login page
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SSOLogin;