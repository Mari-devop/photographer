import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
  position: relative;
  width: 200px; 
  height: 16px;  
`;

export const ProgressLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--primary-color); 
  font-weight: normal; 
  z-index: 1; 
`;