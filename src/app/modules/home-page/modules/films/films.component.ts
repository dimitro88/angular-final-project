import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class FilmsComponent implements OnInit, OnDestroy {

  private sub;

  public search = new FormControl('');
  public response;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private _films: FilmService
  ) { }

  ngOnInit() {
    this.sub = this.search.valueChanges
      .pipe(
        filter(text => text.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(filmName => this.httpService.getFilmsAutocomplete(filmName))
      )
      .subscribe(({ Search }) => {
          this.response = Search;
        },
        err => {
          console.error(err);
        });
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
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

  addToFavourites({ Poster, Title, Runtime, Genre, Type, imdbID }) {
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
