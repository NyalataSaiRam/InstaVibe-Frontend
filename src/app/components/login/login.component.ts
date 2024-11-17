import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }
  loginerr!: any;
  loginForm!: FormGroup;
  token!: any;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required ] ]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      this.authService.loginError.subscribe(v => this.loginerr = v)
    }
  }
}
