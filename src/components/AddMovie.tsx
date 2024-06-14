import React, { useState } from 'react';
import movieStore from '../stores/MovieStore';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('G');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedYear = parseInt(year, 10);
    if (parsedYear < 1800 || parsedYear > 2100) {
      alert('Year must be between 1800 and 2100');
      return;
    }
    movieStore.addMovie({ title, year: parsedYear, rating });
    setTitle('');
    setYear('');
    setRating('G');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Movie</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="M">M</option>
          <option value="MA">MA</option>
          <option value="R">R</option>
        </select>
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
