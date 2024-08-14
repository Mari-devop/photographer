import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar/Navbar';
import AddCollection from '../../components/AddCollection/AddCollection';
import axios from 'axios';
import { ImageData } from '../../types';

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
          },
        });

        if (response.status === 200 && Array.isArray(response.data.images)) {
          const fetchedImages = await Promise.all(response.data.images.map(async (image: any) => {
            try {
              const imageResponse = await axios.get(`https://photodrop-dawn-surf-6942.fly.dev/folders/images/${image.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (imageResponse.status === 200 && imageResponse.data.images.base64Data) {
                return {
                  id: image.id,
                  name: image.name,
                  type: image.type,
                  base64: `data:${image.type};base64,${imageResponse.data.images.base64Data}`,
                };
              } else {
                console.error(`Failed to fetch image content for image ID: ${image.id}. Data might be incomplete.`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching image content for image ID: ${image.id}`, error);
              return null;
            }
          }));

          const validImages = fetchedImages.filter(Boolean) as ImageData[];
          setImages(validImages);
        } else {
          console.error('Failed to fetch images. Response data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    } else {
      console.error('Invalid album ID:', albumId);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [albumId]);

  return (
    <div>
      <CustomNavbar albumId={albumId} onImageUpdated={fetchImages} />
      {albumId && <AddCollection albumId={albumId} images={images} />}
    </div>
  );
};

export default Collection;
