import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/');  
    }
  }, [authToken, navigate]);

  const refreshToken = async () => {
    try {
      const response = await axios.post('https://photodrop-dawn-surf-6942.fly.dev/api/auth/refresh', {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const newToken = response.data.token;
        localStorage.setItem('authToken', newToken);
        setAuthToken(newToken);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      navigate('/');
    }
  };

  return {
    authToken,
    refreshToken,
    setAuthToken,
  };
};
