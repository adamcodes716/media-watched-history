

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/navbar/footer.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';

// import { AdminModule } from './admin/admin.module';

import { MaterialModule } from './data/materials/materials.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MediaWatchedComponent } from './media-watched/media-watched.component';
import { MediaWatchedDetailComponent } from './media-watched/media-watched-detail.component';
import { AdminMenuComponent } from './admin/adminMenu/admin-menu.component';
import { PwsComponent } from './pws/pws.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    MediaWatchedComponent,
    MediaWatchedDetailComponent,
    PwsComponent
  ],
  imports: [
    BrowserModule,
  //  AdminModule,  // has to be imported before routing module because routing is top-down matching
   //  AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'mediawatched' , component: MediaWatchedComponent },
      { path: 'mediawatched/:id' , component: MediaWatchedDetailComponent },
      { path: 'media/:id' , component: MediaWatchedDetailComponent },
      { path: 'home' , component: HomeComponent},
      { path: 'admin', component: AdminMenuComponent},
      { path: 'admin/:id', component: AdminMenuComponent},
      { path: 'weather', component: PwsComponent},
      { path: '' , component: HomeComponent},
      { path: '**' , component: ErrorComponent }
    ])
  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
