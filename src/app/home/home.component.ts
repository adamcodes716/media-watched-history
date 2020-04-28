import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Adam';
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // listFilter = '';


}


