import styled from 'styled-components';

import Card from 'react-bootstrap/Card';

export const AlbumContainer = styled.div`
  position: relative;
  background-color: transparent;
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  cursor: pointer;
  min-width: 300px;
  overflow: hidden;

  &:hover::before {
    opacity: 1;
  }

  &:hover .icon-wrapper {
    opacity: 1;
    pointer-events: all;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,106,0,1); 
    opacity: 0;
    z-index: 2; 
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  gap: 50px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 3;
  pointer-events: none;
  transform: translate(-50%, calc(50% + 50%)); 
`;


export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
`;

export const Title = styled(Card.Title)`
  text-align: center;
  color: var(--dark-color);
  margin: 0;
  min-width: 0;
`;

export const CardContainer = styled(Card)`
  position: relative;  
  background-color: transparent;
  border: none;
`;

export const CardBody = styled(Card.Body)`
  padding: 20px 50px;
`;

export const Text = styled(Card.Text)`
  display: flex;
  color: var(--gray-dark-color);
  margin: 0;
  flex: 1;
  gap: 5px;
  min-width: 0; 
`;
