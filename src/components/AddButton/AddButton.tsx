import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import { Button, Container } from './AddButton.styled';

type AlbumDetails = {
  id: number;
  albumName: string;
  albumLocation: string;
  albumDataPicker: string;
};

type AddButtonProps = {
  onSave: (albumDetails: AlbumDetails) => void;
};

const AddButton = ({ onSave }: AddButtonProps) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = async (albumDetails: Omit<AlbumDetails, 'id'>) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://photodrop-dawn-surf-6942.fly.dev/folders',
        {
          name: albumDetails.albumName,
          location: albumDetails.albumLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },  
        }
      )
      const newAlbum ={
        id: response.data.id,
        albumName: response.data.name,
        albumLocation: response.data.location,
        albumDataPicker: response.data.albumDataPicker,
      };

      onSave(newAlbum);
      setShow(false);
      } catch (error) {
        console.error('Error during save:', error);
      }
    }
  

  return (
    <Container>
      <Button onClick={handleShow} />
      <Modal show={show} handleClose={handleClose} handleSave={handleSave} />
    </Container>
  );
};

export default AddButton;
