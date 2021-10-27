import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { IMessage } from 'types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authSubscription!: Subscription;
  messageSubscription!: Subscription;
  inputValue: string | undefined;
  messages: IMessage[] = [];

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });

    this.messageSubscription = this.chatService.getMessageObservable().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (!this.inputValue) {
      return;
    }

    this.chatService.sendMessage(this.inputValue);
    this.inputValue = '';
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
