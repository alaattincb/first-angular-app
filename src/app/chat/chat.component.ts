import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface ChatMessage {
  text: string;
  username: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, PickerComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatComponent implements OnInit {
  username: string = '';
  message: string = '';
  messages: ChatMessage[] = [];
  isUsernameSet: boolean = false;
  showEmojiPicker: boolean = false;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message: ChatMessage) => {
      this.messages.push(message);
    });
  }

  setUsername(): void {
    if (this.username.trim()) {
      this.isUsernameSet = true;
    }
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const messageObj: ChatMessage = {
        text: this.message,
        username: this.username
      };
      this.webSocketService.sendMessage(messageObj);
      this.message = '';
    }
  }
  getMessageClass(username: string): string {
    switch (username) {
      case 'user1':
        return 'user1';
      case 'user2':
        return 'user2';
      case 'user3':
        return 'user3';
      default:
        return '';
    }
  }
  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any): void {
    this.message += event.emoji.native; // Emoji'yi mesaj alanına ekleyin
    this.showEmojiPicker = false; // Emoji picker'ı kapatın
  }
}
