import React, { useEffect, useState } from "react";
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
  const [username, setUsername] = useState<string | null>(null); 
  const location = useLocation();
  const navigate = useNavigate();
  const showUploadButton = location.pathname.startsWith("/collection");

  useEffect(() => {
    const storedUsername = localStorage.getItem("email");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); 

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const token = localStorage.getItem("authToken");
  
    if (files && files.length > 0 && albumId) {
      try {
        const formData = new FormData();

        for (const file of Array.from(files)) {
          const arrayBuffer = await file.arrayBuffer();
          const blob = new Blob([arrayBuffer], { type: file.type });
          formData.append("images", blob, file.name); 
        }

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
          if (onImageUpdated) onImageUpdated();
        } else {
          console.error("Failed to upload photo:", response.statusText);
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

    if (!token) {
      navigate("/");
    } else {
      console.log("Token is valid, navigating to home.");
      navigate("/home");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email"); 
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
              title={username ? `${username}` : "Sign in as: User"}
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
