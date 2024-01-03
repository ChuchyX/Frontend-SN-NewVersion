import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthLoginResponse } from '../models/AuthLoginResponse';
import { RegisterUserDto } from '../models/RegisterUserDto';
import { ReturnUser } from '../models/ReturnUser';
import { UserLogin } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(user: RegisterUserDto): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7026/api/User/register',
      user
    );
  }

  public login(user: UserLogin): Observable<AuthLoginResponse> {
    return this.http.post<AuthLoginResponse>(
      'https://localhost:7026/api/User/login',
      user
    );
  }

  public getMe(): Observable<ReturnUser> {
    return this.http.get<ReturnUser>('https://localhost:7026/api/User/getme');
  }
}
