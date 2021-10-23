import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private socket!: Socket | null;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.getAuthStatus().subscribe((authStatus) => {
      if (!this.socket && authStatus) {
        this.socket = io('localhost:4201', { withCredentials: true });
      } else if (this.socket && !authStatus) {
        this.socket.disconnect();
        this.socket = null;
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
