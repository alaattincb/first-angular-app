import { Component } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { LandingComponent } from '../landing/landing.component';
import { MoreComponent } from '../more/more.component';
import { RolesComponent } from '../roles/roles.component';
import { FooterContentComponent } from '../footer-content/footer-content.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardsComponent,
    CarouselComponent,
    LandingComponent,
    MoreComponent,
    RolesComponent,
    FooterContentComponent,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
constructor(public sidebarService: SidebarService) {}
}
