import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

interface ChatMessage {
  text: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private readonly url = 'http://localhost:3000'; 

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket'], 
      reconnection: true 
    });
  }

  sendMessage(message: ChatMessage): void {
    this.socket.emit('message', message);
  }

  getMessages(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('message', (message: ChatMessage) => {
        observer.next(message);
      });
    });
  }
}
