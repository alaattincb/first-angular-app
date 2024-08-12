import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwitterDataService {

  constructor() { }

  getTwitter(page: number, pageSize: number): string[] {
    const paragraphs = [];
    for (let i = 0; i < pageSize; i++) {
      paragraphs.push(`Random paragraph ${Math.floor(Math.random() * 100)} for page ${page}`);
    }
    return paragraphs;
  }
}
