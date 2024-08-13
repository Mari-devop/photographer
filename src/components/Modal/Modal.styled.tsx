import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const Title = styled(Modal.Title)`
  color: var(--primary-color);
`;

export const FormControl = styled(Form.Control)`
  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    outline: none;
    border-color: #ff6a006a;
    box-shadow: 0 0 0 0.1rem #ff6a006a;
  }
`;

export const FormLabel = styled(Form.Label)`
  color: var(--gray-dark-color);
`;

export const CustomButton = styled.button`
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
