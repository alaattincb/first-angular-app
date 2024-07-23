import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { bodyComponent } from './body/body.component';
import { navbarComponent } from './navbar/navbar.component';
import { CardsComponent } from "./cards/cards.component"; 

@NgModule({
  declarations: [
    AppComponent,
    bodyComponent,
    navbarComponent  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([]),
    CardsComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
