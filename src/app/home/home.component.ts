import { Component, OnInit } from '@angular/core';
import { DataService } from './../data/data.service';
import { Observable } from 'rxjs';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';

import { Employee } from './../home/Employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Movie Stuff';
  employees: Employee[];  // same as  new Array<Employee>();
  filteredEmployees: Employee[];
  private searchField: FormControl;
  errorMessage: string;
  // listFilter = '';

  _listFilter: string;
   get listFilter(): string {
   return this._listFilter;
   }
   set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEmployees = this.listFilter ? this.performFilter(this.listFilter) : this.employees;
   }

  constructor(private dataService: DataService) {
    this.filteredEmployees = this.employees;
   // this.listFilter = 'Adam';
   }

   getSomeEmployees(){
     console.log ('getting some employees');
     this.dataService.getEmployees();
   }

   performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter((employee: Employee) =>
       employee.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe({
         next:  employees => {
           this.employees = employees,
           this.filteredEmployees = this.employees;
         },
         error: err => this.errorMessage = err
        // next(employees) { this.employees = employees } // shorthand, not working for me
        //  console.log('getting employee');
        //  return new Employee(item.id, item.name, item.status );
        });
  }
  }


