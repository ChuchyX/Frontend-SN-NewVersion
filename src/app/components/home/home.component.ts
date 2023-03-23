import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/auth/auth.UserState';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { PostDto } from 'src/app/models/PostDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userHome$ = this.store.select(selectUser);
  image: any;
  private subscription: Subscription;

  public selectedFile: File;
  content: string;

onFileSelected(event: Event): void {
  let files = (event.target as HTMLInputElement).files;
  this.selectedFile = files?.item(0) as File;
}

subirPost()
{
  this.postsService.addPost(this.content, this.selectedFile).subscribe(r => {
    console.log(r);
  })
}

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<UserState>,
    private postsService: PostsService
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
