import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginResponse, User } from '../model/user.model';
import { MatSnackBar, _MatSnackBarBase } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers';
import { login } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  token: string | null = '';
  isLoggedIn$ = this.auth.isLoggedIn$;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private _erroSnack: MatSnackBar,
    private store: Store<AuthState>
  ) {
    this.form = this.fb.group({
      email: ['trainee1@example.com', Validators.required],
      password: ['Trainee$1', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (!!localStorage.getItem('token')) {
      this.isLoggedIn$.next(true);
      this.router.navigate(['/']);
    } else {
      this.isLoggedIn$.next(false);
    }
  }

  login() {
    const formValues = this.form.value;

    this.auth.login(formValues.email, formValues.password).subscribe(
      (user: LoginResponse) => {

        const userData: User = user.data.user;
        const userToken: string = user.data.token;

        const newLoginAction = login({ user: userData, token: userToken });

        this.store.dispatch(newLoginAction);

        // localStorage.setItem('token', user.data.token);
        // localStorage.setItem('user', JSON.stringify(user.data.user));
        this.router.navigate(['/']);
      },
      (err) => {
        this.isLoggedIn$.next(false);
        this._erroSnack.open(err.error.errors[0].message, '', {
          duration: 5000,
        });
      }
    );
  }
}
