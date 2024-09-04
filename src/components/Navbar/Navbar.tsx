import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'; // Import ProgressBar from react-bootstrap
import {
  NavbarContainer,
  ContainerWrapper,
  BrandWrapper,
  CustomBrand,
  CollapseWrapper,
  CustomNavDropdown,
  CustomItem,
  DownloadButton,
  AlbumInfo,
  Wrap
} from "./Navbar.styled";
import axios from "axios";
import UploadPhotosModal from '../UploadPhotosModal/UploadPhotosModal'; 

interface CustomNavbarProps {
  albumId?: string;
  onImageUpdated?: () => void;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({
  albumId,
  onImageUpdated,
}) => {
  const [username, setUsername] = useState<string | null>(null); 
  const [showModal, setShowModal] = useState(false); 
  const [showUploadCompleteModal, setShowUploadCompleteModal] = useState(false); 
  const [dataPicker, setDataPicker] = useState(''); 
  const [progress, setProgress] = useState(0); 
  const [date, setDate] = useState(''); 
  const location = useLocation();
  const navigate = useNavigate();
  const showUploadButton = location.pathname.startsWith("/collection");

  const { albumName, albumLocation } = location.state || {};

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
      setProgress(10); 
      try {
        const formData = new FormData();
  
        for (const file of Array.from(files)) {
          if (file.name && file.type) {
            const arrayBuffer = await file.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: file.type });
            formData.append("images", blob, file.name);
          } else {
            console.error("File name or type is missing:", file);
          }
        }
  
        const response = await axios.post(
          `https://photodrop-dawn-surf-6942.fly.dev/folders/${albumId}/images`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentage = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentage); 
              }
            },
            params: {
              date: date,
              dataPicker: dataPicker,
            },
          }
        );
  
        if (response.status === 200 || response.status === 201) {
          if (onImageUpdated) {
            onImageUpdated();
          }
          setShowUploadCompleteModal(true);
        } else {
          console.error("Failed to upload photo:", response.statusText);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error uploading photos:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setProgress(100); 
        setTimeout(() => setProgress(0), 1000); 
      }
    } else {
      console.error("Files or albumId are missing.");
    }
  };
  

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveModal = (picker: string, date: string) => {
    setDataPicker(picker);
    setDate(date);

    document.getElementById("file-input")?.click();
  };

  const handleClick = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/");
    } else {
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
            <Wrap>
              {albumName && albumLocation && (
                <AlbumInfo>{albumName} - {albumLocation}</AlbumInfo>
              )}
              {
              progress > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  
                  <div style={{ width: '200px' }}>
                    <ProgressBar
                      now={progress}
                      label={`${progress}%`}
                      variant="warning" 
                      style={{ height: '16px' }} 
                    />
                  </div>
                </div>
              )
            }
            </Wrap>
            {showUploadButton && (
              <>
                <DownloadButton as="label" onClick={handleShowModal}>
                  Upload Photos
                </DownloadButton>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </>
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
      <UploadPhotosModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveModal}
        disableSaveButton={false}
      />

      <Modal
        show={showUploadCompleteModal}
        onHide={() => setShowUploadCompleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All selected photos have been successfully uploaded.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowUploadCompleteModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </NavbarContainer>
  );
};

export default CustomNavbar;
