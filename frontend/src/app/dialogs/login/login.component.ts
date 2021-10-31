import { Component, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from "types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('usernameInput') private usernameInput!: ElementRef;
  @ViewChild('passwordInput') private passwordInput!: ElementRef;
  error: string | void = '';

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) { }

  async onLogin() {
    this.error = '';
    const username = (this.usernameInput.nativeElement as HTMLInputElement).value;
    const password = (this.passwordInput.nativeElement as HTMLInputElement).value;

    if (!username) {
      this.error = 'Username is required';
      return;
    }
    if (!password) {
      this.error = 'Password is required';
      return;
    }

    this.error = await this.authService.login(username, password);

    if (!this.error) {
      this.dialogRef.close();
    }
  }
}
