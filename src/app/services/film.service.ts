import { Injectable } from '@angular/core';
import { FilmModel } from '../models/film-model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmsStore$: [];

  constructor() {
    this.filmsStore$ = JSON.parse(localStorage.getItem('favouritesFilms')) || [];
  }

  getListOfFilms() {
    return this.filmsStore$;
  }

  deleteFilm(id: number) {
    this.filmsStore$ = this.filmsStore$.filter(({ imdbID }) => imdbID !== id );
    localStorage.setItem('favouritesFilms', JSON.stringify(this.filmsStore$));
  }

  addFilm(film: FilmModel) {
    this.filmsStore$.push(film);
    localStorage.setItem('favouritesFilms', JSON.stringify(this.filmsStore$));
  }

}
