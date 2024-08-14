import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaLink } from 'react-icons/fa';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AlbumContainer, CardContainer, Image, Header, Title, Text, IconWrapper } from './Album.styled';
import logo from '../../assets/images/chher.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

export type AlbumProps = {
  id: number;
  albumName: string;
  albumLocation: string;
  albumDataPicker: string;
  onDelete: () => void;
};

const Album = ({ id, albumName, albumLocation, albumDataPicker, onDelete }: AlbumProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleNavigate = () => {
    navigate(`/collection/${id}`);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleConfirmDelete = () => {
    onDelete();
    setShow(false);
  };

  return (
    <AlbumContainer>
      <IconWrapper className="icon-wrapper">
        <FaLink onClick={handleNavigate} style={{ cursor: 'pointer', color: 'white', width: '30px', height: '30px' }} />
        <FaTrash onClick={handleShow} style={{ cursor: 'pointer', color: 'white', width: '30px', height: '30px' }} />
      </IconWrapper>
      <CardContainer>
        <Header>
          <Image variant="top" src={logo} />
          <Title>{albumName}</Title>
        </Header>
        <Card.Body>
          <Text><LocationOnIcon />{albumLocation}</Text>
          <Text><PersonIcon />{albumDataPicker}</Text>
        </Card.Body>
      </CardContainer>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this album? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AlbumContainer>
  );
};

export default Album;
