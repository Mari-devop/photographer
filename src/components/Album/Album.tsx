import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaLink } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AlbumContainer, CardContainer, Header, Title, Text, IconWrapper, CardBody } from './Album.styled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { PiFolderOpenThin } from "react-icons/pi";
import { LinkStyled } from '../../pages/Home/Home.styled';

export type AlbumProps = {
  id: number;
  albumName: string;
  albumLocation: string;
  onDelete: () => void;
};

const Album = ({ id, albumName, albumLocation, onDelete }: AlbumProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);


  const handleNavigate = () => {
    navigate(`/collection/${id}`);
  };


  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleConfirmDelete = () => {
    onDelete();
    setShow(false);
  };


  return (
    <AlbumContainer>
      <IconWrapper className="icon-wrapper">
        <LinkStyled to={`/collection/${id}`}>
          <FaLink style={{ cursor: 'pointer', color: 'white', width: '30px', height: '30px' }} />
        </LinkStyled>
        <FaTrash 
          onClick={handleShow} 
          style={{ cursor: 'pointer', color: 'white', width: '30px', height: '30px' }} 
        />
      </IconWrapper>
      <CardContainer>
        <Header>
          <PiFolderOpenThin style={{ width: '100px', height: '100px', fill: '#ff6a00' }} />
          <Title>{albumName}</Title>
        </Header>
        <CardBody>
          <Text><LocationOnIcon />{albumLocation}</Text>
        </CardBody>
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
