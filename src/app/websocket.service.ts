// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private readonly url = 'http://localhost:3000'; // Sunucunuzun URL'si

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket'], // WebSocket kullanımını zorunlu kılar
      reconnection: true // Bağlantının kesilmesi durumunda yeniden bağlanmayı sağlar
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getMessages(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    });
  }
}
