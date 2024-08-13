import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import AddCollection from '../../components/AddCollection/AddCollection';

const Collection = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Navbar />
      {id && <AddCollection albumId={id} />} 
    </div>
  );
};

export default Collection;
