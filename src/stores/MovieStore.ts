import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import Movie from '../models/Movie';

class MovieStore {
  movies: Movie[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovies() {
    try {
      const response = await axios.get('http://localhost:5001/movies', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      this.setMovies(response.data.map((movieData: any) => new Movie(movieData.id, movieData.title, movieData.year, movieData.rating))); // แปลงข้อมูล JSON เป็นโมเดล Movie
    } catch (error) {
      console.error('Failed to fetch movies', error);
    }
  }

  async addMovie(movieData: { title: string; year: number; rating: string }) {
    try {
      const response = await axios.post('http://localhost:5001/movies', movieData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const newMovie = new Movie(response.data.id, response.data.title, response.data.year, response.data.rating); // สร้างโมเดล Movie จากข้อมูลที่ได้จากการตอบกลับ
      this.setMovies([...this.movies, newMovie]);
    } catch (error) {
      console.error('Failed to add movie', error);
    }
  }

  async deleteMovie(id: number) {
    try {
      await axios.delete(`http://localhost:5001/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      this.setMovies(this.movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error('Failed to delete movie', error);
    }
  }

  setMovies(movies: Movie[]) {
    this.movies = movies;
  }
}

const movieStore = new MovieStore();
export default movieStore;
