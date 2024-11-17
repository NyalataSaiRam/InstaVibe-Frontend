import { AfterContentInit, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Constants } from './core/constants/constants';
import { AuthService } from './core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Home page';
  logo = Constants.logo
  authService = inject(AuthService)

  ngOnInit(): void {
    
  }

  logoutUser(){
    this.authService.logout()
  }
}
