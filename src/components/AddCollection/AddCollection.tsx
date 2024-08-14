import React from 'react';
import { Gallery, ImageWrapper, Image } from './AddCollection.styled';
import { ImageData } from '../../types';

type AddCollectionProps = {
  albumId: string;
  images: ImageData[];
};

const AddCollection: React.FC<AddCollectionProps> = ({ images }) => {
  return (
    <div>
      <Gallery>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <Image src={image.base64} alt={`uploaded ${index}`} />
          </ImageWrapper>
        ))}
      </Gallery>
    </div>
  );
};

export default AddCollection;
