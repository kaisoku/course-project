import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLogginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwithMode() {
    this.isLogginMode = !this.isLogginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLogginMode) {
      authObservable = this.authService.login(email, password);
      authForm.reset();
    } else {
      authObservable = this.authService.signup(email, password);
      authForm.reset();
    }

    authObservable.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading;
      },
    });
  }
}
