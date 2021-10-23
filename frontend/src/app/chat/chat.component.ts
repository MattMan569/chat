import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { io, Socket } from 'socket.io-client';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authSubscription!: Subscription;
  private socket!: Socket | null;

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
