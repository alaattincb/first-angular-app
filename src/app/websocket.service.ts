import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

interface ChatMessage {
  text: string;
  username: string;
  recipient?: string;
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

  getOnlineUsers(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      this.socket.on('onlineUsers', (users: string[]) => {
        observer.next(users);
      });
    });
  }

  registerUser(username: string): void {
    this.socket.emit('register', username);
  }

  unregisterUser(username: string): void {
    this.socket.emit('unregister', username);
  }
}
