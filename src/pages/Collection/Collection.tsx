import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar/Navbar';
import AddCollection from '../../components/AddCollection/AddCollection';
import axios from 'axios';
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

        console.log('Server response:', response);

        if (response.status === 200) {
          const data = response.data;

          console.log('Parsed data:', data);

          if (Array.isArray(data.images)) {
            const fetchImage = await Promise.all(
              data.images.map(async (image: any) => {
                console.log('Image object:', image);

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
    deleteImages([id]);
  };

  return (
    <div>
      <CustomNavbar albumId={albumId} onImageUpdated={fetchImages} />
      {albumId && <AddCollection albumId={albumId} images={images} onDeleteImage={handleDeleteImage} />}
    </div>
  );
};

export default Collection;
