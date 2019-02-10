import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import { FilmService } from '../../../../services/film.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-film-by-id',
  templateUrl: './film-by-id.component.html',
  styleUrls: ['./film-by-id.component.css']
})
export class FilmByIdComponent implements OnInit, OnDestroy {

  private id;
  public filmInfo;
  public similarFilms;
  public recommendedFilms;
  public isFavourite = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private _films: FilmService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(({ id }) => this.id = id);
    this.httpService.getFilmById(this.id)
      .subscribe(
        res => {
          this.filmInfo = res;
          this._films.getListOfFilms().forEach(({ imdbID }) => {
            if (imdbID === res.imdbID) {
              this.isFavourite = true;
            }
          });
        },
        err => console.log('error', error)
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addToFavourites() {
    if (this.isFavourite) {
      this.notifier.notify('error', 'This film is already in your favourite list');
    } else {
      this.isFavourite = true;
      const { Poster, Title, Runtime, Genre, Type, imdbID } = this.filmInfo;
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

  deleteFromFavourites() {
    if (!this.isFavourite) {
      this.notifier.notify('error', 'This film is not in your favourite list');
    } else {
      this.isFavourite = false;
      this._films.deleteFilm(this.filmInfo.imdbID);
    }
  }

}
