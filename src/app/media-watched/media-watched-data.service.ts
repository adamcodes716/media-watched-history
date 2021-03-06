import { GlobalConstants } from '../common/global-constants';
import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Movie } from '../media-watched/movie';
import { Show } from '../media-watched/show';

@Injectable({
  providedIn: 'root'
})
export class MediaWatchedDataService {

  constructor(private http: HttpClient) { }
  // private apiUrl = 'assets/movies.json';
  mediaItemsPerPage = '8';
  mediaPageNumber = 1;
  searchItemsPerPage = 16;
  searchedForItem: string;

  httpOptions = {
    headers: new HttpHeaders({
      //  'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-type': 'application/json',
      'trakt-api-key': '80c91ca13eca53c3eca9fa89945537ae983bd5e1dbefbc503d259032fe2c4217',
      'trakt-api-version': '2'
      // Authorization : 'Bearer 2c9d8bb91acd6c16f044d6bf2dfa0e6ddc35374f66b496dc3c70061d6b0e29b0'
    })
  };
  httpOptionsStaging = {
    headers: new HttpHeaders({
      //  'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-type': 'application/json',
      'trakt-api-key': 'aafaf8d47e51dcb1ee59dd71307fbdbd92c829a16333921c9002109606489df2',
      'trakt-api-version': '2'
      // Authorization : 'Bearer 6fa92ad814a76b1ac46b6a441503059412ed508727d01ebbff9be4bed7b55aaa'
    })
  };
  movies: Observable<Movie>;

  public getMovies(): Observable<Movie[]> {
    // console.log ('getting Page: ' + this.getMoviesURL() );
    const searchUrl = `https://api.trakt.tv/search/tmdb/441393?type=movie&extended=full`;
    return this.http.get<Movie[]>(this.getMoviesURL(), this.httpOptions).pipe(
      // return this.http.get<Movie[]>(searchUrl, this.httpOptions).pipe(
      //  tap(data => console.log( data[0].movie.ids.imdb)),    // this works.  I need to pass this into a second service
      //  tap(data => console.log('All:  ' + JSON.stringify(data))),
      // tap (data => console.log ('Pages = ' + data.headers.getAll('x-total-count')),
      catchError(this.handleError)
    );
    // mergeMap ( theID => this.http.get (this.apiUrl);
  }

  public getMovie(id: number): Observable<Movie[]> {
    const searchUrl = `https://api.trakt.tv/search/tmdb/${id}?type=movie&extended=full`;
    return this.http.get<Movie[]>(searchUrl, this.httpOptions).pipe(
      //  tap(data => console.log( data[0].movie.ids.imdb)),    // this works.  I need to pass this into a second service
      //  tap(data => console.log('All:  ' + JSON.stringify(data))),
      // tap (data => console.log ('Pages = ' + data.headers.getAll('x-total-count')),
      catchError(this.handleError)
    );
  }

  public getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.getShowsURL(), this.httpOptions).pipe(
      //  tap(data => console.log( data[0].show.ids.imdb)),    // this works.  I need to pass this into a second service
      //  tap(data => console.log('All:  ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  public getMediaPoster(mediaType: string, mediaId: string): Observable<any> {
    // console.log ('GETTING MEDIA POSTER');
    const mediaURL = 'https://api.themoviedb.org/3/' + mediaType + '/' + mediaId + '?api_key=28f6a9a21573b05a6f58676063b93231';
    // return this.http.jsonp(mediaURL, 'callback');
    return this.http.get(mediaURL);
    // console.log ('mediaURLTEST = ' + JSON.stringify(mediaURL));
    // const imdbObject = this.http.get<any>(mediaURL);
    // console.log ('imdbObject = ' + JSON.stringify(imdbObject));
    // const imdbObject = this.http.jsonp(mediaURL, 'callback');
    // const imdbObject = this.http.jsonp(mediaURL, 'callback');
    // console.log ('imdbObject = ' + JSON.stringify(imdbObject));
    // return imdbObject;
  }

  getMoviesURL() {
    // return `https://api.trakt.tv/users/AdamMorgan/history/movies?page=${this.mediaPageNumber}&limit=
    // ${this.mediaItemsPerPage}&extended=full`;
    // return  `https://api.trakt.tv/search/tmdb/441393?type=movie&extended=full`;
    // return `https://api.trakt.tv/users/AdamMorgan/watched/movies&extended=full`;
    // return `https://api.trakt.tv/movies/AdamMorgan/ratings?extended=full`;
    if (this.searchedForItem) {
      return `https://api.trakt.tv/search/movie?page=1&query=` + encodeURIComponent(this.searchedForItem) + `&limit=30&extended=full`;
    }
    else {
     // return `https://api.trakt.tv/movies/played?page=${this.mediaPageNumber}&limit=${this.mediaItemsPerPage}&extended=full`;
      return `https://api.trakt.tv/users/AdamMorgan/history/movies?page=${this.mediaPageNumber}
      &limit=${this.mediaItemsPerPage}&extended=full`;
    }
 }
getShowsURL(){
  //  return 'https://api.trakt.tv/users/AdamMorgan/history/shows?page=' + this.mediaPageNumber +
  // '&limit=' + this.mediaItemsPerPage + '&extended=metadata';
  if (this.searchedForItem) {
    return `https://api.trakt.tv/search/show?page=1&query=` + encodeURIComponent(this.searchedForItem) + `&limit=30&extended=full`;
  }
  else {
 //  return `https://api.trakt.tv/shows/played?page=${this.mediaPageNumber}&limit=${this.mediaItemsPerPage}&extended=metadata`;
   return 'https://api.trakt.tv/users/AdamMorgan/history/shows?page=' + this.mediaPageNumber +
  '&limit=' + this.mediaItemsPerPage + '&extended=metadata';
}
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

