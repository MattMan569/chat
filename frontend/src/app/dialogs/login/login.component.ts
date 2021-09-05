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

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) { }

  async onLogin() {
    const username = (this.usernameInput.nativeElement as HTMLInputElement).value;
    const password = (this.passwordInput.nativeElement as HTMLInputElement).value;

    await this.authService.login(username, password);
    this.dialogRef.close();
  }
}
