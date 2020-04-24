import { GlobalConstants } from './../common/global-constants';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Movie } from './../home/movie';
import { Show } from './../home/show';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  // private apiUrl = 'assets/movies.json';
  mediaItemsPerPage = 8;
  mediaPageNumber = 1;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'trakt-api-key': '8d0b9d98f8afbc43ff3e13aad2a3e720982e9f36da0a6fe71a5dee30b8efb6e3',
      'trakt-api-version' : '2'
     // Authorization : 'Bearer 2c9d8bb91acd6c16f044d6bf2dfa0e6ddc35374f66b496dc3c70061d6b0e29b0'
    })
  };
  movies: Observable<Movie>;

  public getMovies(): Observable<Movie[]>
  {
    console.log ('getting page: ' + this.mediaPageNumber );
   // console.log ('getting Movies: ' + this.apiMovieUrl );
    console.log ('getting Page: ' + this.getMoviesURL() );
    return this.http.get<Movie[]>(this.getMoviesURL(), this.httpOptions).pipe(
       tap(data => console.log( data[0].movie.ids.imdb)),    // this works.  I need to pass this into a second service
      tap(data => console.log('All:  ' + JSON.stringify(data))),
     // tap (data => console.log ('Pages = ' + data.headers.getAll('x-total-count')),
      catchError (this.handleError)
      );
      // mergeMap ( theID => this.http.get (this.apiUrl);
    }

    public getShows(): Observable<Show[]>
    {
      return this.http.get<Show[]>(this.getShowsURL(), this.httpOptions).pipe(
         tap(data => console.log( data[0].show.ids.imdb)),    // this works.  I need to pass this into a second service
        tap(data => console.log('All:  ' + JSON.stringify(data))),
        catchError (this.handleError)
        );
        // mergeMap ( theID => this.http.get (this.apiUrl);
      }

getMoviesURL(){
  return 'https://api.trakt.tv/users/AdamMorgan/history/movies?page=' + this.mediaPageNumber +
  '&limit=' + this.mediaItemsPerPage + ' &extended=full';
}
getShowsURL(){
  return 'https://api.trakt.tv/users/AdamMorgan/history/shows?page=' + this.mediaPageNumber +
  '&limit=' + this.mediaItemsPerPage + ' &extended=metadata';
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

