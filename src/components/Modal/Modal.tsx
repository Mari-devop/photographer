import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Title, FormControl, FormLabel, CustomButton } from './Modal.styled';

type AlbumDetails = {
  albumName: string;
  albumLocation: string;
};

type CustomModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSave: (albumDetails: AlbumDetails) => void;
  disableSaveButton: boolean;
};

const CustomModal = ({ show, handleClose, handleSave, disableSaveButton }: CustomModalProps) => {
  const [albumName, setAlbumName] = useState('');
  const [albumLocation, setAlbumLocation] = useState('');

  const handleSaveClick = () => {
    if (albumName.trim()) {
      handleSave({
        albumName,
        albumLocation,
      });
      handleClose(); 
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSaveClick();
    }
  };

  useEffect(() => {
    if (show) {
      setAlbumName(''); 
      setAlbumLocation('');
    }
  }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Title>Create an Album</Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="Magic in Paris"
                autoFocus
                onKeyDown={handleKeyDown}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <FormLabel>Location</FormLabel>
              <FormControl
                type="text"
                value={albumLocation}
                onChange={(e) => setAlbumLocation(e.target.value)}
                placeholder="Notre Dame De Paris"
                onKeyDown={handleKeyDown}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton onClick={handleSaveClick} disabled={disableSaveButton}>
            Save Changes
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
