import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserFrontend } from 'types';

const SERVER_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  private username: string | undefined | null;

  constructor(private http: HttpClient) {
    this.http.get<IUserFrontend>(`${SERVER_URL}/validate`).subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.authStatus.next(true);
      } else {
        this.username = null;
        this.authStatus.next(false);
      }
    }, (error: HttpErrorResponse) => {
      console.error(error);
      this.username = null;
      this.authStatus.next(false);
    });
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getUsername() {
    return this.username;
  }

  signup(username: string, password: string) {
    return new Promise<string | void>((resolve) => {
      this.http.post<IUserFrontend>(`${SERVER_URL}/signup`, { username, password }).subscribe((user) => {
        this.username = user.username;
        this.authStatus.next(true);
        resolve();
      }, (error: HttpErrorResponse) => {
        console.error(error);
        let errorMessage: string;
        switch (error.status) {
          case 500:
            errorMessage = 'Server error, please try again';
            break;
          case 400:
            errorMessage = error.error;
            break;
          default:
            errorMessage = 'Unknown error';
            break;
        }
        resolve(errorMessage);
      });
    });
  }

  login(username: string, password: string) {
    return new Promise<string | void>((resolve) => {
      this.http.post<IUserFrontend>(`${SERVER_URL}/login`, { username, password }).subscribe((user) => {
        this.username = user.username;
        this.authStatus.next(true);
        resolve();
      }, (error: HttpErrorResponse) => {
        console.error(error);
        let errorMessage: string;
        switch (error.status) {
          case 500:
            errorMessage = 'Server error, please try again';
            break;
          case 400:
            errorMessage = 'Incorrect login information';
            break;
          default:
            errorMessage = 'Unknown error';
            break;
        }
        resolve(errorMessage);
      });
    });
  }

  logout() {
    return new Promise<string | void>((resolve) => {
      this.http.post(`${SERVER_URL}/logout`, null).subscribe(() => {
        this.username = null;
        this.authStatus.next(false);
        resolve();
      }, (error: HttpErrorResponse) => {
        console.error(error);
        resolve(error.name);
      });
    });
  }
}
