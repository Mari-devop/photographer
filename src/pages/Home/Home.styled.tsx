import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HomeContainer = styled(Container)`
    margin-top: 60px;
    margin-bottom: 60px;
`;
export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  cursor: none;

  &:hover {
    text-decoration: none;
  }
`;