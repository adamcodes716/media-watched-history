import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/navbar/footer.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './data/materials/materials.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MediaWatchedComponent } from './media-watched/media-watched.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    MediaWatchedComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,  // has to be imported before routing module because routing is top-down matching
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
