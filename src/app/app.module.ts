import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {BodyComponent} from './body/body.component'
import { NavbarComponent } from './navbar/navbar.component';
import { CardsComponent } from "./cards/cards.component"; 
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([]),
    CardsComponent,
    NgbModule,
    
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
