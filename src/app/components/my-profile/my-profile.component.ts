import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { UploadService } from 'src/app/services/upload.service';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { UserState } from 'src/app/state/auth/auth.UserState';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  userProfile$ = this.store.select(selectUser);
  image: any;
  private subscriptionSelect: Subscription;
  private subscriptionUpload: Subscription;
  loading = false;

  constructor(
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.subscriptionSelect = this.store.select(selectUser).subscribe((r) => {
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
    if (this.subscriptionSelect) this.subscriptionSelect.unsubscribe();
    if (this.subscriptionUpload) this.subscriptionUpload.unsubscribe();
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  handleFileInput(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        if (files.item(index)) {
          this.postFile(files.item(index) as File);
        }
      }
    }

    (event.target as HTMLInputElement).files = null;
    (event.target as HTMLInputElement).value = '';
  }

  postFile(file: File) {
    this.loading = true;
    this.subscriptionUpload = this.uploadService
      .postFile(file)
      .subscribe((u: ReturnUser) => {
        this.update();
        this.loading = false;
      });
  }

  update() {
    this.store.dispatch(AuthActions.getUserRequest());
  }
}
