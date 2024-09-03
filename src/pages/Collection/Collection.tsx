import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar/Navbar';
import AddCollection from '../../components/AddCollection/AddCollection';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ImageData } from '../../types';

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const Collection = () => {
  const { id: albumId } = useParams<{ id: string }>();
  const [images, setImages] = useState<ImageData[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [imageToDelete, setImageToDelete] = useState<number | null>(null); 

  const fetchImages = async () => {
    const token = localStorage.getItem('authToken');

    if (albumId && !isNaN(Number(albumId))) {
      try {
        const response = await axios.get(`https://photodrop-dawn-surf-6942.fly.dev/folders/${albumId}/images`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;

          if (Array.isArray(data.images)) {
            const fetchImage = await Promise.all(
              data.images.map(async (image: any) => {
                const imageResponse = await axios.get(`https://photodrop-dawn-surf-6942.fly.dev/folders/images/${image.id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                });

                if (imageResponse.status === 200 && imageResponse.data) {
                  const imageSrc = `data:image/jpeg;base64,${arrayBufferToBase64(imageResponse.data.imageInfo.imageData.data)}`;
                    
                  return {
                    id: image.id,
                    name: image.name,
                    type: image.type,
                    binaryString: imageSrc,
                    dataPicker: image.dataPicker, 
                    date: image.date, 
                  };
                } else {
                  console.error(`Failed to fetch image data for image ID: ${image.id}`);
                  return null;
                }
              })
            );

            setImages(fetchImage.filter(Boolean));
          } else {
            console.error('Failed to fetch images. Response data is not an array.');
          }
        } else {
          console.error('Failed to fetch images. Server responded with:', response.status);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    } else {
      console.error('Invalid album ID:', albumId);
    }
  };

  const deleteImages = async (ids: number[]) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.delete('https://photodrop-dawn-surf-6942.fly.dev/images', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { ids },
      });

      if (response.status === 200) {
        setImages(prevImages => prevImages.filter(image => !ids.includes(image.id)));
      } else {
        console.error('Failed to delete images:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [albumId]);

  const handleDeleteImage = (id: number) => {
    setImageToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteImage = () => {
    if (imageToDelete !== null) {
      deleteImages([imageToDelete]);
    }
    setShowDeleteModal(false);
    setImageToDelete(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setImageToDelete(null);
  };

  return (
    <div>
      <CustomNavbar albumId={albumId} onImageUpdated={fetchImages} />
      {albumId && <AddCollection albumId={albumId} images={images} onDeleteImage={handleDeleteImage} />}
      
      <Modal
        show={showDeleteModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this image? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteImage}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Collection;
