import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Collection from './pages/Collection/Collection';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setLoading(false); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/collection/:id" element={<Collection />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
