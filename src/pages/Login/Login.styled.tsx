import styled from 'styled-components';
import { Row, InputGroup, Form } from 'react-bootstrap';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const StyledRow = styled(Row)`
  width: 100%;
  max-width: 300px; 
  border-radius: 10px;

  &:nth-child(2) {
    margin-top: 20px;
  }
`;

export const StyledInputGroup = styled(InputGroup)`
    width: 100%;
    padding: 0;
    
`;

export const StyledFormControl = styled(Form.Control)`
  width: 100%;

  &:placeholder {
    color: var(--secondary-color);
  }

  &:focus {
    outline: none;
    border-color: #ff6a006a;
    box-shadow: 0 0 0 0.1rem #ff6a006a; 
  }
`;

export const Button = styled.button`
    width: 100%;
    background-color: var(--white-color);
    color: var(--gray-dark-color);
    border: var(--border-width) solid var(--gray-color);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
`;



