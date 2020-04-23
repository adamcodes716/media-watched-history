
import { Component, OnInit } from '@angular/core';
import { DataService } from './../data/data.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';

import { Movie } from './movie';
import { Show } from './show';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  constructor(private dataService: DataService) {
    this.filteredMovies = this.movies;
   // this.listFilter = 'Adam';
   }

   performFilter(filterBy: string): Movie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: Movie) =>
      movie.movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
selectionMediaChanged(item) {
  console.log('Selected value: ' + item.value);
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
        },
        error: err => this.errorMessage = err
       // next(employees) { this.employees = employees } // shorthand, not working for me
       //  console.log('getting employee');
       //  return new Employee(item.id, item.name, item.status );
       });
    }
}

ngOnInit(): void {
  this.getMedia('Movies');
  }
}
