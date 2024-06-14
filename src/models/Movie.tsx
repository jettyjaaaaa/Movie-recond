import { makeAutoObservable } from 'mobx';

class Movie {
  id: number;
  title: string;
  year: number;
  rating: string;

  constructor(id: number, title: string, year: number, rating: string) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.rating = rating;
    makeAutoObservable(this); 
  }
}

export default Movie;
