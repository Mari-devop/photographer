import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  NavbarContainer,
  ContainerWrapper,
  BrandWrapper,
  CustomBrand,
  CollapseWrapper,
  CustomNavDropdown,
  CustomItem,
  DownloadButton,
} from "./Navbar.styled";
import axios from "axios";

interface CustomNavbarProps {
  albumId?: string;
  onImageUpdated?: () => void;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({
  albumId,
  onImageUpdated,
}) => {
  const location = useLocation();
  const showUploadButton = location.pathname.startsWith("/collection");
  const navigate = useNavigate();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const token = localStorage.getItem("authToken");
  
    if (files && files.length > 0 && albumId) {
      const formData = new FormData();
  
      Array.from(files).forEach((file, index) => {
        console.log(`Appending file: ${file.name}, size: ${file.size}`);
        formData.append("images", file);
      });
  
      try {
        console.log("Uploading photos...", formData);
        const response = await axios.post(
          `https://photodrop-dawn-surf-6942.fly.dev/folders/${albumId}/images`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.status === 200 || response.status === 201) {
          console.log("Photos uploaded successfully");
          if (onImageUpdated) onImageUpdated();
        } else {
          console.error("Failed to upload photos:", response.statusText);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error uploading photos:",
            error.response?.data || error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  const handleClick = () => {
    const token = localStorage.getItem("authToken");
    console.log("Token before navigating to home:", token);

    if (!token) {
      console.error("No token found, redirecting to login.");
      navigate("/");
    } else {
      console.log("Token is valid, navigating to home.");
      navigate("/home");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <NavbarContainer expand="lg">
      <Container fluid>
        <ContainerWrapper>
          <BrandWrapper>
            <CustomBrand>Photographer</CustomBrand>
          </BrandWrapper>
          <CollapseWrapper>
            {showUploadButton && (
              <DownloadButton as="label">
                Upload Photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </DownloadButton>
            )}
            <CustomNavDropdown
              id="nav-dropdown-dark-example"
              title="Sign in as: User"
            >
              <CustomItem onClick={handleClick}>Albums</CustomItem>
              <NavDropdown.Divider />
              <CustomItem onClick={handleLogout}>Log out</CustomItem>
            </CustomNavDropdown>
          </CollapseWrapper>
        </ContainerWrapper>
      </Container>
    </NavbarContainer>
  );
};

export default CustomNavbar;
