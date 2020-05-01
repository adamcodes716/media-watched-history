import { GlobalConstants } from '../common/global-constants';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MediaWatchedDataService } from '../media-watched/media-watched-data.service';
import { Observable, throwError } from 'rxjs';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';

import { Movie } from './movie';
import { Show } from './show';
import { ChangeDetectionStrategy,  Input} from '@angular/core';
import { concatMap, switchMap, take, toArray, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

// import { PaginationInstance } from 'ngx-pagination';


@Component({
  selector: 'app-home',
  templateUrl: './media-watched.component.html',
  styleUrls: ['./media-watched.component.scss']
})
export class MediaWatchedComponent implements OnInit {
  pageTitle = 'Movie Stuff';
  movies: Movie[];  // same as  new Array<Movies>();
  shows: Show[];
  filteredMovies: Movie[];
  filteredShows: Show[];
  private searchField: FormControl;
  errorMessage: string;
  toggleOptions: Array<string> = ['Movies', 'Shows'];
  selectedMedia = 'Movies';
  isMovie = true;
  totalRecords = '1000';
  page = 1;
  poster: string;
  searchBoxField: string;
  // listFilter = '';

  // tslint:disable-next-line: variable-name
  // _listFilter: string;
  //  get listFilter(): string {
 //  return this._listFilter;
  //  }
  // set listFilter(value: string) {
  //  this._listFilter = value;
  //  this.filteredMovies = this.listFilter ? this.performFilter(this.listFilter) : this.movies;
  // }

  constructor(public mediaWatchedDataService: MediaWatchedDataService) {
    this.filteredMovies = this.movies;
  }

//   performFilter(filterBy: string): Movie[] {
//    filterBy = filterBy.toLocaleLowerCase();
//    return this.movies.filter((movie: Movie) =>
//      movie.movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
// }

onPageChange(pageVal: number) {
 // console.log ('changing pages');
 // console.log('change to page', pageVal);
  this.mediaWatchedDataService.mediaPageNumber = pageVal;
  this.getMedia(this.selectedMedia);
  this.mediaWatchedDataService.mediaPageNumber = pageVal;
}
selectionMediaChanged(item) {
 // console.log('Selected value: ' + item.value);
  this.selectedMedia = item.value;
  this.mediaWatchedDataService.mediaPageNumber = 1;
  this.getMedia(item.value);
  // this.selectedMedia.forEach(i => console.log(`Included Item: ${i}`));
}

getMedia(mediaType: string): void {
   if (mediaType === 'Movies') {
     this.isMovie = true;
     // console.log (`Media = ${mediaType}`);
     this.mediaWatchedDataService.getMovies()
     .pipe(
     // Receive an array of posts
      // Use "from" emit each value one by one
     switchMap((posts: Movie[]) => from(posts)),
     // Take(10) to avoid too many requests
      take(10),
     // For each movie, fetch the movie poster from tmdb
     // concatMap((post: Movie) => this.http.get(`${this.url}/${post.id}/comments`)
     concatMap((post: Movie) => this.mediaWatchedDataService.getMediaPoster('movie', post.movie.ids.tmdb)
        .pipe(
         map((comments: MoviePosterInterface) => comments),
         ),
        // Use result selector function to add poster in the post object
        (post: Movie, comments: MoviePosterInterface) => {
          const postWithComments: MovieWithPoster = {...post, comments};
          return postWithComments;
        }
     ),
     // Aggregates all the posts in an array
     toArray()
     )
         .subscribe((postsWithComments: MovieWithPoster[]) => {
          // console.log(postsWithComments);
           this.movies = postsWithComments;
           this.filteredMovies = postsWithComments;
         }
       );
   } else {
     this.isMovie = false;
     // console.log (`Media = ${mediaType}`);
     this.mediaWatchedDataService.getShows()
     .pipe(
      // Receive an array of posts
       // Use "from" emit each value one by one
      switchMap((posts: Show[]) => from(posts)),
      // Take(10) to avoid too many requests
       take(10),
      // For each movie, fetch the movie poster from tmdb
      // concatMap((post: Movie) => this.http.get(`${this.url}/${post.id}/comments`)
      concatMap((post: Show) => this.mediaWatchedDataService.getMediaPoster('tv', post.show.ids.tmdb)
         .pipe(
          map((comments: MoviePosterInterface) => comments),
          ),
         // Use result selector function to add poster in the post object
         (post: Show, comments: MoviePosterInterface) => {
           const postWithComments: ShowWithPoster = {...post, comments};
           return postWithComments;
         }
      ),
      // Aggregates all the posts in an array
      toArray()
      )
          .subscribe((postsWithComments: ShowWithPoster[]) => {
           // console.log(postsWithComments);
            this.shows = postsWithComments;
            this.filteredShows = postsWithComments;
          }
        );

    }
}

getPosterUrl(path: string){
  return 'url(\'https://image.tmdb.org/t/p/w500/' + path + '\')';
}

searchMedia(searchBoxValue: string){
   console.log ('search on ' + searchBoxValue);
   this.mediaWatchedDataService.searchedForItem = searchBoxValue;
   this.getMedia(this.selectedMedia);
}

clearSearchField(){
  this.searchBoxField = '';
  this.mediaWatchedDataService.searchedForItem = '';
  this.getMedia(this.selectedMedia);
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

ngOnInit(): void {
  this.getMedia(this.selectedMedia);
  // this.dataService.paginator = this.paginator;
  }

}

interface MovieWithPoster extends Movie {
  comments: MoviePosterInterface;
}

interface ShowWithPoster extends Show {
  comments: MoviePosterInterface;
}

interface MoviePosterInterface {
  poster_path: string;
  homepage: string;
}
