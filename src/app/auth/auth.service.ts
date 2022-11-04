import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { AuthResponseData } from "./auth.model";
import { User } from "./user.model";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}
    
    signup(email: string, password: string): Observable<AuthResponseData> {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`;
        const body = { email, password, returnSecureToken: true };

        return this.callAuthApi(url, body);
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`;
        const body = { email, password, returnSecureToken: true };
        
        return this.callAuthApi(url, body);
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['/auth']);
    }

    autoLogin() {
        const userData = localStorage.getItem('userData');
        if(!userData) {
            return;
        }
        const parsedUser: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(userData);

        const loadedUser = new User(parsedUser.email, parsedUser.id, parsedUser._token, new Date(parsedUser._tokenExpirationDate));

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(parsedUser._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    callAuthApi(url: string, body: { email: string, password: string}): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(url, body)
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                })
            );
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err);
        let errorMessage = err.error?.error?.message || "An unknown error occurred.";

        return throwError(() => new Error(errorMessage));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);

        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
