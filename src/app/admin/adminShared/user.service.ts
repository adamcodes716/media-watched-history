import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import * as firebase from 'firebase';


// @Injectable()
// export class UserService implements CanActivate {
//    userLoggedIn = false;
//    loggedInUser: string;
//    authUser: any;
//
//    constructor( private router: Router ) {
//        firebase.initializeApp({
//           apiKey: 'AIzaSyDOClMHkMce5eW6gRg1Xq9aFmtFXsItlNs',
//           authDomain: 'gigabytegames-d5120.firebaseapp.com',
//           databaseURL: 'https://gigabytegames-d5120.firebaseio.com',
//           storageBucket: 'gigabytegames-d5120.appspot.com',
//           messagingSenderId: '125857354979'
//        });
//     }

//    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//        const url: string = state.url;
//        // return this.verifyLogin(url);
//        return this.verifyLogin();
//    }

    // verifyLogin(url: string): boolean {
//      verifyLogin(): boolean {
//        console.log ('Verify login.  Logged in=' + this.userLoggedIn);
       // if (this.userLoggedIn) { return true; }
        // console.log (url);
//        if (localStorage.getItem('user')) {
//          console.log('user ist logged in ....', localStorage.getItem('user'));
//
//          return true;
//      } else {
//          console.log('user is not logged in');

//          this.router.navigate(['/admin/login']);
//          return false;
//      }
//    }

//    register(email: string, password: string){
      //  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      //          alert(`${error.message} Please Try Again!`);
      //  });
//    }

//    verifyUser() {
//        console.log('User Service.  Verify user: ' + this.authUser);
//        this.authUser = firebase.auth().currentUser;
//        if (this.authUser) {

//            alert(`Welcome ${this.authUser.email}`);
//            this.loggedInUser = this.authUser.email;
//            this.userLoggedIn = true;
//            this.router.navigate(['/admin']);
//        }
//    }

//    login(loginEmail: string, loginPassword: string) {
//      console.log ('Trying to log in');
    //  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).then(function(){
    //    localStorage.setItem('user', firebase.auth().currentUser.email);
    //  })
    //  .catch(function(error) {
    //            alert(`${error.message} Unable to login. Try again!`);
    //    });
//    }

//    logout(){
//        this.userLoggedIn = false;
    //    firebase.auth().signOut().then(function() {
    //      localStorage.removeItem('user');
    //      alert(`Logged Out!`);
    //    }, function(error) {
    //        alert(`${error.message} Unable to logout. Try again!`);
    //    });
//    }

// }
