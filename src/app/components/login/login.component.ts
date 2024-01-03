import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserLogin } from 'src/app/models/User';
import { selectLoading } from 'src/app/state/auth/auth.selectors';
import * as AuthActions from '../../state/auth/auth.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new UserLogin();
  loading$ = this.store.select(selectLoading);

  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async Login() {
    // const credentials =
    // {
    //   email: this.user.email,
    //   password: this.user.password
    // }

    // this.store.dispatch(AuthActions.loginRequest({ credentials }));
    this.authService.login(this.user).subscribe(res => {
      console.log("resultado login: ",res)
    });


  }

}
