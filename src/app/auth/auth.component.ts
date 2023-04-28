import {
  Component,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/plaeHolder/placeHolder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLogginMode = true;
  isLoading = false;
  error: string = null;
  //@ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

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
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      },
    });
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    /* const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainer = this.alertHost.viewContaainerRef;
    hostViewContainer.clear();

    hostViewContainer.createComponent(alertComponentFactory); */
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.subscription = componentRef.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      this.viewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
