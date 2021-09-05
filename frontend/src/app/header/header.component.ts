import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from 'rxjs';

import { LoginComponent } from '../dialogs/login/login.component';
import { SignupComponent } from '../dialogs/signup/signup.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  isAuthenticated = false;

  constructor(
    private loginDialog: MatDialog,
    private signupDialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLoginClick() {
    this.loginDialog.open(LoginComponent, {
      panelClass: "dialog"
    });
  }

  onSignupClick() {
    this.signupDialog.open(SignupComponent, {
      panelClass: "dialog"
    });
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
