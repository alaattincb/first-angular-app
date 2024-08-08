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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RolesComponent } from './roles/roles.component';
import { AppRoutingModule } from './app.routes';
import { NewsComponent } from './news/news.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FileUploadComponent
    
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
    AppRoutingModule,
    NgApexchartsModule,
    BrowserModule,
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
