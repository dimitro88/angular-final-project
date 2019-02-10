import { Component, OnInit } from '@angular/core';
import {FilmService} from '../../../../services/film.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite-films',
  templateUrl: './favourite-films.component.html',
  styleUrls: ['./favourite-films.component.css']
})
export class FavouriteFilmsComponent implements OnInit {
  public films;

  constructor(private _films: FilmService, private router: Router) { }

  ngOnInit() {
    this.films = this._films.getListOfFilms();
  }

  getInfoDetails(id) {
    this.router.navigate(['/home/films', id]);
  }


  deleteFromFavourites({ imdbID }) {
    this._films.deleteFilm(imdbID);
    this.films = this._films.getListOfFilms();
  }

}
