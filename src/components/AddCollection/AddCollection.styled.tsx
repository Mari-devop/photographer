import styled from "styled-components";

export const FileInput = styled.input`
  display: none;
`;

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
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(3n) {
        grid-row: span 2;
    }

    &:nth-child(2n) {
        grid-column: span 2;
    }

    &:nth-child(5n) {
        grid-column: span 2;
        grid-row: span 2;
    }

    @media (max-width: 550px) {
        &:nth-child(3n) {
            grid-row: span 1;
        }

        &:nth-child(2n) {
            grid-column: span 1;
        }

        &:nth-child(5n) {
            grid-column: span 1;
            grid-row: span 1;
        }
    }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
