import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Employee } from './../home/Employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'assets/employees.json';
  employees: Observable<Employee>;

  public getEmployees(): Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}


// private handleError(err: HttpErrorResponse) {
//  let errorMessage = '';
//  if (err.error instanceof ErrorEvent) {
//    errorMessage = `An error occurred: ${err.error.message}`;
//  } else {
//    errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;
//    console.error(errorMessage);
//    return throwError(errorMessage);
//  }
// }

 // getSubscriptionTypes(): Observable<string>[]{
    // return of(['Monthly', 'Annual', 'LifeTime']);
 // }

