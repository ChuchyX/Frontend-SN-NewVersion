import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './state/auth/auth.UserState';
import * as AuthActions from '../app/state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    if (this.IsAuthenticated) {
      this.store.dispatch(AuthActions.getUserRequest());
    }
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
