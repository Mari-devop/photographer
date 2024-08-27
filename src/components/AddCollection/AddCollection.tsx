import React from 'react';
import { Gallery, ImageWrapper, Image } from './AddCollection.styled';
import { ImageData } from '../../types';
import { FaTrash } from 'react-icons/fa';
import { IconWrapper } from './AddCollection.styled';

type AddCollectionProps = {
  albumId: string;
  images: ImageData[];
  onDeleteImage: (id: number) => void;
};

const AddCollection: React.FC<AddCollectionProps> = ({ images, onDeleteImage }) => {
  return (
    <div>
      <Gallery>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <Image src={image.binaryString} alt={`uploaded ${index}`} />
            <IconWrapper>
              <FaTrash onClick={() => onDeleteImage(image.id)} style={{ cursor: 'pointer', color: 'white', width: '30px', height: '30px' }} />
            </IconWrapper>
          </ImageWrapper>
        ))}
      </Gallery>
    </div>
  );
};

export default AddCollection;
