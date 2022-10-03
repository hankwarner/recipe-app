import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error: string;

    constructor(
        private authService: AuthService,
        private router: Router
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
                this.isLoading = false;
            }
        })
        
        form.reset();
    }
}
