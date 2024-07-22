import { Component } from '@angular/core';
import {Movie} from '../movie';

@Component({
  selector: 'movie',
  standalone: true,
  imports: [],
  templateUrl: 'movie.component.html'
})
export class MovieComponent {
    title = 'Movie List';

    movie: Movie = {
      id: 1,
      name: 'Movie Name'
    }

    getTitle(){
      return this.title;
    }
}
