import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { UserState } from 'src/app/state/auth/auth.UserState';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  userNav$ = this.store.select(selectUser);
  image: any;

  constructor(private router: Router, private sanitizer: DomSanitizer,
    private store: Store<UserState>) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(r => {
      if(r?.image !== null)
      {
        this.image =
            'data:image/jpeg;base64,' +
            (
              this.sanitizer.bypassSecurityTrustResourceUrl(
                r?.image.fileContents
              ) as any
            ).changingThisBreaksApplicationSecurity;
      }
    })
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  Register() {
    this.router.navigate(['/register']);
  }

  Login() {
    this.router.navigate(['/login']);
  }

  Logout() {
    localStorage.removeItem('authToken');
    this.store.dispatch(AuthActions.Logout());
    this.router.navigate(['/home']);
  }
}
