import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/internal/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmService } from '../../../../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  public search = new FormControl('');
  public response;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private _films: FilmService
  ) { }

  ngOnInit() {
    this.search.valueChanges
      .pipe(
        filter(text => text.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(filmName => this.httpService.getFilmsAutocomplete(filmName))
      )
      .subscribe(res => {
          this.response = res.Search;
        },
        err => {
          console.log(err);
        });
  }

  getInfoDetails(id) {
    this.router.navigate(['/home/films', id]);
  }

  isFavourite(item) {
    let flag = false;
    this._films.getListOfFilms().forEach(({ imdbID }) => {
      console.log();
      if (imdbID === item.imdbID) {
        flag = true;
      }
    });
    return flag;
  }

  deleteFromFavourites({ imdbID }) {
    this._films.deleteFilm(imdbID);
  }

  addToFavourites(item) {
    const { Poster, Title, Runtime, Genre, Type, imdbID } = item;
    this._films.addFilm({
      Poster,
      Title,
      Runtime,
      Genre,
      Type,
      imdbID
    });
  }

}
