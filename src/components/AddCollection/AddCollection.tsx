import React, { useState, useEffect } from 'react';
import { FileInput, Gallery, ImageWrapper, Image } from './AddCollection.styled';

type AddCollectionProps = {
  albumId: string;
};

const AddCollection: React.FC<AddCollectionProps> = ({ albumId }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const savedAlbums = localStorage.getItem('albums');
    if (savedAlbums) {
      const albums = JSON.parse(savedAlbums);
      const album = albums.find((album: { id: string }) => album.id === albumId);
      if (album && album.images) {
        setImages(album.images);
      }
    }
  }, [albumId]);

  return (
    <div>
      <FileInput type="file" multiple />
      <Gallery>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <Image src={image} alt={`uploaded ${index}`} />
          </ImageWrapper>
        ))}
      </Gallery>
    </div>
  );
};

export default AddCollection;
