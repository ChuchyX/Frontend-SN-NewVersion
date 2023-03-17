import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/auth/auth.UserState';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userHome$ = this.store.select(selectUser);
  image: any;
  private subscription: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select(selectUser).subscribe((r) => {
      if (r?.image !== null) {
        this.image =
          'data:image/jpeg;base64,' +
          (
            this.sanitizer.bypassSecurityTrustResourceUrl(
              r?.image.fileContents
            ) as any
          ).changingThisBreaksApplicationSecurity;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
