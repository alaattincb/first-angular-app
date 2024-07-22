import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from "./movie/movie.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([]),
    MovieComponent,
    MovieDetailComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
