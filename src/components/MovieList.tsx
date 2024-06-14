import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'; //for notice the change
import movieStore from '../stores/MovieStore'; //import from mobx store

interface MovieListProps { //set component from movielist to string
  role: string;
}

const MovieList: React.FC<MovieListProps> = observer(({ role }) => {
  useEffect(() => {
    movieStore.fetchMovies();
  }, []);

  const handleDelete = (id: number) => {
    movieStore.deleteMovie(id);
  };

  return (
    // <div className="movie-list-container1">
    <div>
      <h2>Movie List</h2>
      <div className="movie-list-header">
        <div className="movie-title">Name</div>
        <div className="movie-year">Year</div>
        <div className="movie-rating">Rate</div>
        {role === 'MANAGER' && <div>Action</div>}
      </div>
      <ul className="movie-list">
        {movieStore.movies.map((movie) => ( //loop movies by moviestore and build li for each movies
          <li key={movie.id} className="movie-item">
            <div className="movie-details">
              <div className="movie-title">{movie.title}</div>
              <div className="movie-year">{movie.year}</div>
              <div className="movie-rating">{movie.rating}</div>
            </div>
            {role === 'MANAGER' && (
              <button className="delete-button" onClick={() => handleDelete(movie.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default MovieList;
