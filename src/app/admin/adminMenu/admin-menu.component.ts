import { Component, OnInit } from '@angular/core';
// import {UserService} from '../adminShared/user.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
 })

export class AdminMenuComponent implements OnInit {
  theUser: string;

 // constructor( private userSVC: UserService, private router: Router ){}

  ngOnInit(){
   // console.log('logged in user = ' + this.userSVC.loggedInUser);
    // this.theUser = this.userSVC.loggedInUser;
    this.theUser = localStorage.getItem('user');

  }

  logout(){
  //  this.userSVC.logout();
  //  this.router.navigate(['']);
  }
}
