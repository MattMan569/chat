import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('usernameInput') private usernameInput!: ElementRef;
  @ViewChild('passwordInput') private passwordInput!: ElementRef;
  @ViewChild('confirmInput') private confirmInput!: ElementRef;
  error: string | void = '';

  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
    private authService: AuthService,
  ) { }

  async onSignup() {
    this.error = '';
    const username = (this.usernameInput.nativeElement as HTMLInputElement).value;
    const password = (this.passwordInput.nativeElement as HTMLInputElement).value;
    const confirm = (this.confirmInput.nativeElement as HTMLInputElement).value;

    if (!username) {
      this.error = 'Username is required';
      return;
    }
    if (!password) {
      this.error = 'Password is required';
      return;
    }
    if (!confirm) {
      this.error = 'Please confirm your password';
      return;
    }
    if (password !== confirm) {
      this.error = 'Passwords do not match';
      return;
    }

    this.error = await this.authService.signup(username, password);

    if (!this.error) {
      this.dialogRef.close();
    }
  }
}
