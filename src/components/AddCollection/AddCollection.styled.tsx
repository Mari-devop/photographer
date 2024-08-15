import styled from "styled-components";

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-auto-rows: 240px;
  grid-gap: 10px;
  margin: 50px;
  grid-auto-flow: dense; 

  @media (max-width: 470px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const ImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(3n) {
        grid-row: span 2;
    }

    &:nth-child(2n) {
        grid-column: span 2;
        grid-row: span 3;
    }

     &:nth-child(4n) {
        grid-column: span 2;
        grid-row: span 3;
    }

    &:nth-child(5n) {
        grid-column: span 1;
        grid-row: span 3;
    }

    &:hover .icon-wrapper {
        opacity: 1;
    }

    &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: rgba(255,106,0,0.8); 
    opacity: 0;
    z-index: 2; 
    transition: opacity 0.3s ease-in-out;
    }

    &:hover::after {
        opacity: 1;
    }

    @media (max-width: 1920px) {
         &:nth-child(1n) {
            grid-column: span 1;
        }
    }

    @media (max-width: 869px) {
        &:nth-child(1n) {
            grid-row: span 2;
        }
        &:nth-child(5n) {
            grid-row: span 5;
        }
    }
    @media (max-width: 550px) {
        &:nth-child(3n) {
            grid-row: span 1;
        }

        &:nth-child(2n) {
            grid-column: span 1;
        }

         &:nth-child(5n) {
            grid-row: span 5;
        }
    }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;


export const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 13%;
  left: 50%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 3;
  pointer-events: none;
  transform: translate(-50%, 50%); 

   ${ImageWrapper}:hover & {
    opacity: 1; 
    pointer-events: all; 
  }
`;