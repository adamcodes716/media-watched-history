import { Component, OnInit } from '@angular/core';
import { DataService } from './../data/data.service';
import { Observable } from 'rxjs';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';

import { Employee } from './../home/Employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees = new Array<Employee>();
  private searchField: FormControl;

  constructor(private dataService: DataService) {
    this.dataService.getEmployees().subscribe(response =>
      {
        this.employees = response.map(item =>
        {
          console.log('getting employee');
          return new Employee(item.id, item.name, item.status );
        });
      });
   }

   getSomeEmployees(){
     console.log ('getting some employees');
     this.dataService.getEmployees();
   }

  ngOnInit() {}

  }


