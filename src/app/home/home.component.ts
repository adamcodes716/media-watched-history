import { Component, OnInit } from '@angular/core';
import { DataService } from './../data/data.service';
import { Observable } from 'rxjs';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';

import { Movie } from './movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Movie Stuff';
  movies: Movie[];  // same as  new Array<Movies>();
  filteredMovies: Movie[];
  private searchField: FormControl;
  errorMessage: string;
  // listFilter = '';

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
      movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

  ngOnInit(): void {
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
  }
  }


