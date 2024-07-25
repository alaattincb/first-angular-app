import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CardsComponent } from "./cards/cards.component"; 
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from "./carousel/carousel.component";
import { LandingComponent } from './landing/landing.component';
import { MoreComponent } from './more/more.component';
import { FooterContentComponent } from "./footer-content/footer-content.component";
import { HttpClientModule } from '@angular/common/http';
import { RolesComponent } from './roles/roles.component';
import { AppRoutingModule } from './app.routes';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    CardsComponent,
    NgbModule,
    CarouselComponent,
    LandingComponent,
    MoreComponent,
    FooterContentComponent,
    RolesComponent,
    AppRoutingModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
