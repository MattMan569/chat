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

  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
    private authService: AuthService,
  ) { }

  async onSignup() {
    const username = (this.usernameInput.nativeElement as HTMLInputElement).value;
    const password = (this.passwordInput.nativeElement as HTMLInputElement).value;
    const confirm = (this.confirmInput.nativeElement as HTMLInputElement).value;

    // TODO
    if (password !== confirm) {
      console.log('mismatch');
      return;
    }

    await this.authService.signup(username, password);
    this.dialogRef.close();
  }
}
