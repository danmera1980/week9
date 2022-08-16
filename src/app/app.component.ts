import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from './auth/model/user.model';
import { AuthService } from './services/auth.service';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';
import { login, logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  public screenWidth: any;
  token: string | null = '';
  user!: string | null;
  userProfile: User = {
    id: '',
    email: '',
    name: '',
  };

  @ViewChild('start') sidenav!: MatSidenav;

  loading: boolean = true;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ){}

  ngOnInit(){

    this.token = localStorage.getItem('token');
    this.user = localStorage.getItem('user');
    if(!!this.user && !!this.token){
      this.store.dispatch(login({user: JSON.parse(this.user), token: this.token}))
      this.userProfile = JSON.parse(this.user)
    }

    if(!!this.token){
      this.isLoggedIn$.next(true);
    }

    this.screenWidth = window.innerWidth;

    this.router.events.subscribe(event => {
      switch(true){
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }

        default: {
          break;
        }
      }
    });

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 425) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  logout(){
    this.store.dispatch(logout())
    this.isLoggedIn$.next(false)
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }


}
