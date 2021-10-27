import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { IMessage } from 'types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private socket!: Socket | null;
  private authSubscription: Subscription;
  private messageSubject = new Subject<IMessage>();

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.getAuthStatus().subscribe((authStatus) => {
      if (!this.socket && authStatus) {
        this.socket = io(environment.serverUrl, { withCredentials: true });
        this.eventHandler();
      } else if (this.socket && !authStatus) {
        this.socket.disconnect();
        this.socket = null;
      }
    });
  }

  getMessageObservable() {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: string) {
    this.socket?.emit('message', message);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  // Set up socket.io event listeners
  private eventHandler() {
    this.socket?.on('message', (message: IMessage) => {
      this.messageSubject.next(message);
    });
  }
}
