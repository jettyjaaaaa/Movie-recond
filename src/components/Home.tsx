import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import movieStore from '../stores/MovieStore';
import MovieList from './MovieList';
import './Home.css';

const Home = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('G');
  const [error, setError] = useState<string | null>(null); // State for error message
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); //pull token from localStroage for checking when login

  useEffect(() => {
    if (!token) {
      navigate('/login'); 
    } else {
      movieStore.fetchMovies();
    }
  }, [token, navigate]);

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !year) {
      setError('Title and Year are required');
      return;
    }

    const newMovie = {
      id: '', 
      title,
      year: parseInt(year, 10),
      rating,
    };

    try {
      await movieStore.addMovie(newMovie);
      setTitle('');
      setYear('');
      setRating('G');
      setError(null); 
    } catch (err) {
      console.error('Failed to add movie', err);
      setError('Failed to add movie');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); //Remove token from localStroage
    navigate('/login');
  };

  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : '';
  //use token too pull action role user from payload JWT
  return (
    <div className="home-container">
      <header className="header">
        <h1>Movie Records</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>
      <div className="content-container">
        <div className="add-movie-container">
          {(userRole === 'MANAGER' || userRole === 'TEAMLEADER' || userRole === 'FLOORSTAFF') && (
            <form onSubmit={handleAddMovie} className="form-add-movie">
              <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label>Year:</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="1800"
                  max="2100"
                />
              </div>
              <div>
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="M">M</option>
                  <option value="MA">MA</option>
                  <option value="R">R</option>
                </select>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
              <button type="submit">Add Movie</button>
            </form>
          )}
        </div>
        <div className="movie-list-container">
          <MovieList role={userRole} />
        </div>
      </div>
    </div>
  );
};

export default Home;
