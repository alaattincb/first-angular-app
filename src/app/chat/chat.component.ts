import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ChatMessage {
  text: string;
  username: string;
  recipient?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string = '';
  message: string = '';
  messages: { [key: string]: ChatMessage[] } = {}; // Her kullanıcı için mesajları sakla
  onlineUsers: string[] = [];
  selectedUser: string = '';
  unreadMessages: { [key: string]: number } = {}; // Her kullanıcı için okunmamış mesaj sayısı

  constructor(private webSocketService: WebSocketService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getName() || '';

    this.webSocketService.getMessages().subscribe((message: ChatMessage) => {
      if (!this.messages[message.username]) {
        this.messages[message.username] = [];
      }
      if (message.recipient === this.username || !message.recipient) {
        this.messages[message.username].push(message);
        if (message.recipient !== this.username && this.selectedUser !== message.username) {
          // Eğer mesaj bu kullanıcıya değilse ve seçili kullanıcı değilse, mesaj sayısını artır
          this.unreadMessages[message.username] = (this.unreadMessages[message.username] || 0) + 1;
        }
      }
    });

    this.webSocketService.getOnlineUsers().subscribe((users: string[]) => {
      this.onlineUsers = users.filter(user => user !== this.username);;
    });

    this.webSocketService.registerUser(this.username);
  }

  selectUser(user: string): void {
    this.selectedUser = user;
    this.unreadMessages[user] = 0; // Kullanıcı seçildiğinde, okunmamış mesaj sayısını sıfırla
  }
  closeChatBox(): void {
    this.selectedUser = ''; // Kullanıcı seçimini sıfırla, böylece ChatBox gizlenir
  }
  getMessagesForSelectedUser(): ChatMessage[] {
    return this.messages[this.selectedUser] || [];
  }

  sendMessage(): void {
    if (this.message.trim() && this.selectedUser) {
      const messageObj: ChatMessage = {
        text: this.message,
        username: this.username,
        recipient: this.selectedUser
      };
      this.webSocketService.sendMessage(messageObj);
      if (!this.messages[this.username]) {
        this.messages[this.username] = [];
      }
      this.messages[this.username].push(messageObj);
      
      if (!this.messages[this.selectedUser]) {
        this.messages[this.selectedUser] = [];
      }
      // Mesaj kutusunu temizle
      this.message = '';
    }
  }

  logout(): void {
    this.webSocketService.unregisterUser(this.username); // Kullanıcıyı kayıttan çıkar
    this.authService.logout();
    this.router.navigate(['/chat-login']);
  }
  
}
