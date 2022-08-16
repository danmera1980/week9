import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, User } from '../auth/model/user.model';

@Injectable()
export class AuthService {

  url: string = environment.api_url;
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const payload = {
      data: {
        email,
        password
      }
    }

    return this.http.post<LoginResponse>(`${this.url}/users/login`, payload)
  }
}
