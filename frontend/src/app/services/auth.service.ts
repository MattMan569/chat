import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const SERVER_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  signup(username: string, password: string) {
    return new Promise<string | void>((resolve) => {
      this.http.post(`${SERVER_URL}/signup`, { username, password }).subscribe(() => {
        resolve();
        this.authStatus.next(true);
      }, (error: HttpErrorResponse) => {
        console.error(error);
        resolve(error.name);
      });
    });
  }

  login(username: string, password: string) {
    return new Promise<string | void>((resolve) => {
      this.http.post(`${SERVER_URL}/login`, { username, password }).subscribe(() => {
        resolve();
        this.authStatus.next(true);
      }, (error: HttpErrorResponse) => {
        console.error(error);
        resolve(error.name);
      });
    });
  }

  logout() {
    return new Promise<string | void>((resolve) => {
      this.http.post(`${SERVER_URL}/logout`, null).subscribe(() => {
        resolve();
        this.authStatus.next(false);
      }, (error: HttpErrorResponse) => {
        console.error(error);
        resolve(error.name);
      });
    });
  }
}
