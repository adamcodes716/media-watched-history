
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Movie } from './../home/movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'assets/movies.json';
  movies: Observable<Movie>;

  public getMovies(): Observable<Movie[]>
  {
    // return this.http.get<Movie[]>(this.apiUrl);
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      tap(data => console.log('All:  ' + JSON.stringify(data))),
      catchError (this.handleError)
    );
    }



 private handleError(err: HttpErrorResponse) {
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;
    console.error(errorMessage);
    return throwError(errorMessage);
  }
 }
}

