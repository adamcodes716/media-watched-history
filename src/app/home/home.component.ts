import { GlobalConstants } from './../common/global-constants';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from './../data/data.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';

import { Movie } from './movie';
import { Show } from './show';
import { ChangeDetectionStrategy,  Input} from '@angular/core';
// import { PaginationInstance } from 'ngx-pagination';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
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
  // listFilter = '';

  // tslint:disable-next-line: variable-name
  _listFilter: string;
   get listFilter(): string {
   return this._listFilter;
   }
   set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMovies = this.listFilter ? this.performFilter(this.listFilter) : this.movies;
   }

  constructor(public dataService: DataService) {
    this.filteredMovies = this.movies;
   // this.listFilter = 'Adam';
   }

   performFilter(filterBy: string): Movie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: Movie) =>
      movie.movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

onPageChange(pageVal: number) {
  console.log ('changing pages');
  console.log('change to page', pageVal);
  this.dataService.mediaPageNumber = pageVal;
  this.getMedia(this.selectedMedia);
  this.dataService.mediaPageNumber = pageVal;
}
selectionMediaChanged(item) {
  console.log('Selected value: ' + item.value);
  this.selectedMedia = item.value;
  this.dataService.mediaPageNumber = 1;
  this.getMedia(item.value);
  // this.selectedMedia.forEach(i => console.log(`Included Item: ${i}`));
}

getMedia(mediaType: string): void {
   if (mediaType === 'Movies') {
     this.isMovie = true;
     console.log (`Media = ${mediaType}`);
     this.dataService.getMovies().subscribe({
        next:  movies => {
          this.movies = movies,
          this.filteredMovies = this.movies;
          console.log('getting poster = ' + this.dataService.getMediaPoster('movie', '1234'));
        },
        error: err => this.errorMessage = err
       // next(employees) { this.employees = employees } // shorthand, not working for me
       //  console.log('getting employee');
       //  return new Employee(item.id, item.name, item.status );
       });
   } else {
     this.isMovie = false;
     console.log (`Media = ${mediaType}`);
     this.dataService.getShows().subscribe({
        next:  shows => {
          this.shows = shows;
          this.filteredShows = this.shows;
          // console.log(response.headers.get('X-Total-Count'));
        },
        error: err => this.errorMessage = err
       // next(employees) { this.employees = employees } // shorthand, not working for me
       //  console.log('getting employee');
       //  return new Employee(item.id, item.name, item.status );
       });
    }
}

ngOnInit(): void {
  this.getMedia(this.selectedMedia);
  // this.dataService.paginator = this.paginator;
  }

ngAfterViewInit() {
}
}
