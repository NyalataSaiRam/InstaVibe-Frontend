import { inject, Injectable, OnInit, signal } from '@angular/core';
// import { environment } from '../../../environments/environment.development';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { loginStructure, SignUpStructure } from '../models/auth.models';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { EncryptDecryptService } from './encrypt-decrypt.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router)





  url = environment.DEV_SERVER
  loginError = new BehaviorSubject(false);

  isUserLoggedIn() {
    const localdata = sessionStorage.getItem('token')

    if (localdata) {
      return true
    }

    return false
  }



  constructor(
    private http: HttpClient,
    private encDecService: EncryptDecryptService,

  ) { }

  getUserDetails(): Observable<any> {
    const token = sessionStorage.getItem('token')
    if (!token?.length) {
      this.router.navigateByUrl('login')
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get(this.url + '/user/details', { headers })

  }

  singup(data: SignUpStructure): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })
    return this.http.post(
      this.url + '/user/signup',
      {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      },
      { headers }
    ).pipe(catchError(this.handleError))
  }

  login(data: loginStructure): void {
    const headers = new HttpHeaders({ 'content-type': 'application/json' })

    this.http.post(
      this.url + '/user/login',
      {
        email: data.email,
        password: data.password,
      },
      { headers })
      .subscribe(
        {
          next: (data: any) => {
            sessionStorage.setItem("token", data.token)
            this.loginError.next(false)
            this.router.navigateByUrl('home')
          },
          error: (error) => {
            this.loginError.next(true)
          }
        }
      );
  }

  logout() {
    sessionStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }

  changeUserDetails(data: any): Observable<any> {
    let token = sessionStorage.getItem('token')
    if (!token?.length) return of('');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.put(this.url + '/user', data, { headers })

  }

  handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      console.log('Client side Error', err.error.message)
      errMsg = err.error.message;

    } else {
      errMsg = 'sever side error';

    }

    return throwError(() => errMsg)
  }
}

