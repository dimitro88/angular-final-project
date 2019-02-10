import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

import {catchError, map, retry} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly url = `http://localhost:3000`;
  private readonly filmUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=d4b7e426&`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  registration(registerBody) {
    return this.httpClient
      .post(`${this.url}/register`, registerBody, this.httpOptions)
      .pipe(
        catchError(this._handleError),
        map((res: any) => res)
      );
  }

  login(loginBody) {
    return this.httpClient
      .post(`${this.url}/login`, loginBody, this.httpOptions)
      .pipe(
        catchError(this._handleError),
        map((res: any) => res)
      );
  }

  getFilmsAutocomplete(film) {
    return this.httpClient
      .get(`${this.filmUrl}s=${film}`)
      .pipe(
        retry(3),
        catchError(this._handleError),
        map((res: any) => res)
      );
  }

  getFilmById(id) {
    return this.httpClient
      .get(`http://www.omdbapi.com/?i=${id}&&apikey=d4b7e426&plot=full`)
      .pipe(
        retry(3),
        catchError(this._handleError),
        map((res: any) => res)
      );
  }

  private _handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err);
  }

}
