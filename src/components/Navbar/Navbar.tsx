import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavbarContainer, ContainerWrapper, BrandWrapper, CustomBrand, CollapseWrapper, CustomNavDropdown, CustomItem, DownloadButton } from './Navbar.styled';

const CustomNavbar = () => {
  const location = useLocation();
  const showDownloadButton = location.pathname === '/collection';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpirationTime');
    navigate('/');
  }

  return (
    <NavbarContainer expand="lg">
      <Container fluid>
        <ContainerWrapper>
          <BrandWrapper>
            <CustomBrand>Photographer</CustomBrand>
          </BrandWrapper>
          <CollapseWrapper>
            {showDownloadButton && (
              <>
                <DownloadButton>
                  Download
                </DownloadButton>
              </>
            )}
              <CustomNavDropdown
                id="nav-dropdown-dark-example"
                title="Sign in as: User"
              >
                <CustomItem onClick={handleClick}>
                  Albums
                </CustomItem>
                <NavDropdown.Divider />
                <CustomItem onClick={handleLogout}>
                  Log out
                </CustomItem>
              </CustomNavDropdown>
          </CollapseWrapper>
        </ContainerWrapper>
      </Container>
    </NavbarContainer>
  );
}

export default CustomNavbar;
