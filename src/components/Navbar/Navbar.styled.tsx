import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

export const NavbarContainer = styled(Navbar)`
  padding: 10px;
  background-color: var(--lightest-color);
  border-bottom: 1px solid var(--gray-color);
  box-shadow: var(--box-shadow);
  width: 100%;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CustomBrand = styled(BootstrapNavbar.Brand)`
  color: var(--primary-color);
  -webkit-box-shadow: 0px 0px 105px 45px rgba(255,106,0,0.9);
  -moz-box-shadow: 0px 0px 105px 45px rgba(255,106,0,0.9);
  box-shadow: 0px 0px 105px 45px rgba(255,106,0,0.9);
  border-radius: 10px;
  padding: 10px;
  border: 1px solid rgba(255,106,0,0.9);
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-family);
  text-transform: uppercase;
  margin-right: 20px;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color);
  }

  @media (max-width: 500px) {
    margin-right: 10px;
    font-size: 0.8rem;
    padding: 5px;
  }

  @media (max-width: 379px) {
    margin-right: 5px;
    font-size: 0.7rem;
    padding: 5px;
  }
`;

export const CustomNavDropdown = styled(NavDropdown)`
  color: var(--gray-dark-color);
  font-weight: 700;
  padding: 10px;

  &:hover, &:focus, &:active, &.show > .nav-link {
    color: var(--primary-color) !important;
  }

  &:hover {
    color: var(--primary-color) !important;
    -webkit-box-shadow: 0px 0px 105px 45px rgba(255,106,0,0.9);
    -moz-box-shadow: 0px 0px 105px 45px rgba(255,106,0,0.9);
    box-shadow: 0px 0px 105px 45px rgba(255,106,0,0.9);
    border-radius: 10px;
    border: 1px solid rgba(255,106,0,0.9);
  }

  .dropdown-menu {
    min-width: 150px !important; 
  }

  @media (max-width: 500px) {
    font-size: 0.8rem;
    padding: 5px;
    .dropdown-menu {
        min-width: 120px !important; 
      }
  }

  @media (max-width: 379px) {
    font-size: 0.7rem;
    padding: 5px;
    .dropdown-menu {
        min-width: 105px !important; 
    }
  }         
`;

export const CustomItem = styled(NavDropdown.Item)`
  color: var(--gray-dark-color);
  padding: 0px 10px !important; 
  font-size: 1rem;
  
  &:hover {
    background-color: rgba(255,106,0,0.1);
    color: var(--primary-color);
  }

  @media (max-width: 500px) {
    margin-right: 10px;
    font-size: 0.8rem;
    padding: 0px 10px !important; 
  }

  @media (max-width: 379px) {
    margin-right: 5px;
    font-size: 0.7rem;
    padding: 0px 10px !important; 
  }
`;

export const CollapseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  
  .navbar-collapse {
    flex-grow: 0;
  }

  @media (max-width: 500px) {
    justify-content: space-between;

  }
`;

export const DownloadButton = styled.a`
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 15px;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }

  @media (max-width: 500px) {
    padding: 3px 5px;
    font-size: 0.8rem;
  }
`;

export const FileInput = styled.input`
  display: none;
`;