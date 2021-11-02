import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { IMessage } from 'types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesDiv') messagesDiv: ElementRef | undefined;
  isAuthenticated = false;
  authSubscription!: Subscription;
  messageSubscription!: Subscription;
  inputValue: string | undefined;
  messages: IMessage[] = [];
  private checkScroll = false;
  private scrollAtBottom = true;

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus().subscribe((authStatus) => {
      // Delete messages on log out
      if (!authStatus) {
        this.messages = [];
      }

      this.isAuthenticated = authStatus;
    });

    this.messageSubscription = this.chatService.getMessageObservable().subscribe((message) => {
      this.messages.push(message);
      this.checkScroll = this.scrollAtBottom; // Only auto scroll if user has scrolled to the bottom
    });
  }

  ngAfterViewChecked() {
    if (this.checkScroll) {
      this.scrollMessageDiv();
    }
  }

  // Check if the user has scrolled to the bottom
  onScroll() {
    if (!this.messagesDiv) {
      return;
    }

    const div = this.messagesDiv.nativeElement as HTMLDivElement;
    this.scrollAtBottom = div.scrollTop === div.scrollHeight - div.offsetHeight;
  }

  sendMessage() {
    if (!this.inputValue) {
      return;
    }

    this.chatService.sendMessage(this.inputValue);
    this.inputValue = '';
  }

  private scrollMessageDiv() {
    this.checkScroll = false;
    if (!this.messagesDiv) {
      return;
    }

    const div = this.messagesDiv.nativeElement as HTMLDivElement;
    div.scrollTop = div.scrollHeight;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
