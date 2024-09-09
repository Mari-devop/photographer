import React, { useState, useEffect } from 'react';
import CustomNavbar from '../../components/Navbar/Navbar';
import Album from '../../components/Album/Album';
import AddButton from '../../components/AddButton/AddButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HomeContainer } from './Home.styled';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

type AlbumDetails = {
  id: number;
  albumName: string;
  albumLocation: string;
};

const Home = () => {
  const [albums, setAlbums] = useState<AlbumDetails[]>([]);
  const [isFetched, setIsFetched] = useState(false); 
  const { authToken, refreshToken } = useAuth();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://photodrop-dawn-surf-6942.fly.dev/folders', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          const formattedAlbums = response.data.map((album: any) => ({
            id: album.id,
            albumName: album.name,
            albumLocation: album.location,
            dataPicker: album.dataPicker, 
            date: album.date,  
          }));

          setAlbums(formattedAlbums);
          setIsFetched(true); 
        } else {
          throw new Error('Failed to fetch albums. Response data is not an array.');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await refreshToken();
          fetchAlbums(); 
        } else {
          console.error('Error fetching albums:', error);
        }
      }
    };

    if (authToken && !isFetched) {
      fetchAlbums();
    }
  }, [authToken, refreshToken, isFetched]); 

  const handleSaveAlbum = async (albumDetails: AlbumDetails) => {
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
      );

      const newAlbum = {
        id: response.data.id,
        albumName: response.data.name,
        albumLocation: response.data.location,
      };

      setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
    
    } catch (error) {
      console.error('Error saving album:', error);
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    try {
      const token = localStorage.getItem('authToken');
  
      await axios.delete(`https://photodrop-dawn-surf-6942.fly.dev/folders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setAlbums((prevAlbums) => prevAlbums.filter(album => album.id !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };
  

  return (
    <div>
      <CustomNavbar />
      <HomeContainer>
        <Row className="g-5">
          <Col xs={12} sm={11} md={6} lg={4} xl={4}>
            <AddButton onSave={handleSaveAlbum} />
          </Col>
          {albums.map((album, index) => (
            <Col key={index} xs={12} sm={11} md={6} lg={4} xl={4}>
             
              <Album
                id={album.id} 
                albumName={album.albumName}
                albumLocation={album.albumLocation}
                onDelete={() => handleDeleteAlbum(album.id)}
              />
             
            </Col>
          ))}
        </Row>
      </HomeContainer>
    </div>
  );
};

export default Home;
