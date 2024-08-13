import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  background-color: transparent;
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  color: var(--primary-color);
  font-size: 40px;
  font-weight: 100;
  cursor: pointer;
  padding: 105px;
  margin: 0;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  min-width: 300px; 

  &:hover {
    background-color: rgba(255,106,0,0.1);
    transform: scale(0.8);
  }

  &::before {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: content 0.2s;
  }

  &:hover::before {
    content: 'Add Album';
    font-size: 20px;
    font-weight: 700;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
