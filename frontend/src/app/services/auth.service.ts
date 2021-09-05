import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  signup() {
    this.authStatus.next(true);
  }

  login(username: string, password: string) {
    return new Promise<string>((resolve, reject) => {
      resolve('nice');
      this.authStatus.next(true);
    });
  }

  logout() {
    this.authStatus.next(false);
  }
}
