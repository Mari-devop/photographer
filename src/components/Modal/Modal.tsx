import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Title, FormControl, FormLabel, CustomButton } from './Modal.styled';

type AlbumDetails ={
  albumName: string;
  albumLocation: string;
  albumDataPicker: string;
}

type CustomModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSave: (albumDetails: AlbumDetails) => void;
};

const CustomModal = ({ show, handleClose, handleSave }: CustomModalProps) => {
  const [albumName, setAlbumName] = useState('');
  const [albumLocation, setAlbumLocation] = useState('');
  const [albumDataPicker, setAlbumDataPicker] = useState('');

  const handleSaveClick = () => {
    if(albumName.trim()) {
      handleSave({
        albumName,
        albumLocation,
        albumDataPicker,
      });
    } 
  };

  useEffect(() => {
    if (show) {
      setAlbumName(''); 
      setAlbumLocation('');
      setAlbumDataPicker('');
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
                type="name"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="Magic in Paris"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <FormLabel>Location</FormLabel>
              <FormControl
                type="location"
                value={albumLocation}
                onChange={(e) => setAlbumLocation(e.target.value)}
                placeholder="Notre Dame De Paris"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <FormLabel>DataPicker</FormLabel>
              <FormControl
                type="dataPicker"
                value={albumDataPicker}
                onChange={(e) => setAlbumDataPicker(e.target.value)}
                placeholder="Mr. Bean"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton onClick={handleSaveClick}>
            Save Changes
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomModal