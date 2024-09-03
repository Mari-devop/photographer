import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { LoginContainer, StyledRow, StyledInputGroup, StyledFormControl, Button } from './Login.styled';

type LoginProps = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const handleLogin = async () => {
    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch('https://photodrop-dawn-surf-6942.fly.dev/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('email', email);
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        setShowError(true); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      setShowError(true); 
    }
  };

  return (
    <LoginContainer>
      <StyledRow>
        <StyledInputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <StyledFormControl
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
        </StyledInputGroup>
      </StyledRow>
      <StyledRow>
        <StyledInputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">**</InputGroup.Text>
          <StyledFormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            aria-label="password"
            aria-describedby="basic-addon1"
            type="password"
          />
        </StyledInputGroup>
      </StyledRow>
      <StyledRow>
        <Button onClick={handleLogin}>Login</Button>
      </StyledRow>


      <Modal show={showError} onHide={() => setShowError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Email or password is incorrect. Please try again.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowError(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </LoginContainer>
  );
};

export default Login;
