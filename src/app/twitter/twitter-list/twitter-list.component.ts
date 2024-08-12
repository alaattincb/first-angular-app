import { Component, HostListener, OnInit } from '@angular/core';
import { TwitterDataService } from '../twitter-data.service';

@Component({
  selector: 'app-twitter-list',
  templateUrl: './twitter-list.component.html',
  styleUrl: './twitter-list.component.css'
})
export class TwitterListComponent implements OnInit {

  private allCards: NodeListOf<HTMLElement> | null = null; 
  visibleCardsCount: number = 0; 
  isLoading: boolean = false; 

  ngOnInit() {
    this.allCards = document.querySelectorAll('.container .card');
    this.visibleCardsCount = 0;
    this.loadMoreCards();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      console.log('Sayfanın sonuna ulaşıldı, daha fazla kart yükleniyor...');
      this.loadMoreCards();
    }
  }

  loadMoreCards(): void {
    this.isLoading = true; 

    setTimeout(() => { 
      if (this.allCards) {
        this.allCards.forEach((card, index) => {
          if (index < this.visibleCardsCount + 1) {
            card.style.display = 'block'; 
          } else {
            card.style.display = 'none';
          }
        });

        this.visibleCardsCount += 1;

        if (this.visibleCardsCount >= this.allCards.length) {
          this.visibleCardsCount = this.allCards.length;
          console.log('Tüm kartlar yüklendi.');
        }
      }

      this.isLoading = false; // Yükleme tamamlandı
    }, 500); // Gecikme süresi
  }
}