import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import workosService from '../services/workos';
import { initAuth } from '../redux/actions';

export function SSOCallback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const user = await workosService.getUser();

        if (user) {
          localStorage.setItem('token', user.id);
          dispatch(initAuth({
            id: user.id,
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
            firstName: user.firstName,
            lastName: user.lastName
          }));

          navigate('/warehouse');
        } else {
          setError('Authentication failed. Please try again.');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (err) {
        console.error('SSO Callback Error:', err);
        setError('Authentication failed. Please try again.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate, dispatch]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="spinner-glass w-8 h-8 mx-auto mb-6"></div>
          <p className="text-text-secondary">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-screen">
        <div className="alert-glass alert-danger text-center max-w-md">
          <h4 className="text-lg font-semibold mb-4">Authentication Error</h4>
          <p className="mb-4">{error}</p>
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return null;
}

export default SSOCallback;
