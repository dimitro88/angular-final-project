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
  private readonly postcodeUrl = `https://postcodes.io`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  _pipe(info) {
    return info.pipe(
      catchError(this._handleError),
      map((res: any) => res)
    );
  }

  registration(registerBody) {
    return this._pipe(this.httpClient.post(`${this.url}/register`, registerBody, this.httpOptions));
  }

  login(loginBody) {
    return this._pipe(this.httpClient.post(`${this.url}/login`, loginBody, this.httpOptions));
  }

  getFilmsAutocomplete(film) {
    return this._pipe(this.httpClient.get(`${this.filmUrl}s=${film}`));
  }

  getFilmById(id) {
    return this._pipe(this.httpClient.get(`http://www.omdbapi.com/?i=${id}&&apikey=d4b7e426&plot=full`));
  }

  autocompletePostcode(postcode) {
    return this._pipe(this.httpClient.get(`${this.postcodeUrl}/postcodes/${postcode}/autocomplete`));
  }

  lookupPostcode(postcode) {
    return this._pipe(this.httpClient.get(`${this.postcodeUrl}/postcodes/${postcode}`));
  }

  private _handleError(err: HttpErrorResponse) {
    console.error(err);
    return throwError(err);
  }

}
