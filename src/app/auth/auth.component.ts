import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthResponseData } from './auth.model';
import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error: string;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closedSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(form.invalid) {
            return;
        }
        this.isLoading = true;

        const authObservable: Observable<AuthResponseData> = this.isLoginMode 
            ? this.authService.login(form.value.email, form.value.password)
            : this.authService.signup(form.value.email, form.value.password);

        authObservable.subscribe({
            next: res => {
                console.log(res);
                this.isLoading = false;
                this.router.navigate(["/recipes"]);
            },
            error: errorMessage => {
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        })
        
        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy() {
        if(this.closedSub) {
            this.closedSub.unsubscribe();
        }
    }

    // show error programatically
    private showErrorAlert(message: string) {
        // create an instance of the alert component
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        componentRef.instance.message = message;
        this.closedSub = componentRef.instance.close.subscribe(() => {
            this.closedSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
