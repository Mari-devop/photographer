import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Album from '../../components/Album/Album';
import AddButton from '../../components/AddButton/AddButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HomeContainer } from './Home.styled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type AlbumDetails = {
  id: number;
  albumName: string;
  albumLocation: string;
  albumDataPicker: string;
};

const Home = () => {
  const [albums, setAlbums] = useState<AlbumDetails[]>([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email'); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');  
      return;
    }

    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem('authToken');
    
        const response = await axios.get('https://photodrop-dawn-surf-6942.fly.dev/folders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          const formattedAlbums = response.data.map((album: any) => ({
            id: album.id,
            albumName: album.name,
            albumLocation: album.location,
            albumDataPicker: userEmail || '',
          }));

          setAlbums(formattedAlbums);
        } else {
          throw new Error('Failed to fetch albums. Response data is not an array.');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            try {
              const refreshResponse = await axios.post('https://photodrop-dawn-surf-6942.fly.dev/api/auth/refresh', {}, {
                withCredentials: true, 
              });

              if (refreshResponse.status === 200) {
                
                localStorage.setItem('authToken', refreshResponse.data.token);
                fetchAlbums(); 
              } else {
               
                navigate('/');
              }
            } catch (refreshError) {
              console.error('Error refreshing token:', refreshError);
              navigate('/'); 
            }
          } else {
            console.error('Error fetching albums:', error.message);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchAlbums();
  }, [navigate, userEmail]);

  const handleSaveAlbum = async (albumDetails: Omit<AlbumDetails, 'id'>) => {
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
        albumDataPicker: userEmail || '',
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
      <Navbar />
      <HomeContainer>
        <Row className="g-5">
          <Col xs={12} sm={11} md={6} lg={4} xl={4}>
            <AddButton onSave={handleSaveAlbum} />
          </Col>
          {albums.map((album, index) => (
            <Col key={index} xs={12} sm={11} md={6} lg={4} xl={4}>
              <Album
                albumName={album.albumName}
                albumLocation={album.albumLocation}
                albumDataPicker={album.albumDataPicker}
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
