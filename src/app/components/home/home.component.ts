import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/auth/auth.UserState';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { PostDto } from 'src/app/models/PostDto';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userHome$ = this.store.select(selectUser);
  postList: Post[];
  image: any;
  imageView: any;
  loading = false;
  private subscription: Subscription;
  private subscriptionPosts: Subscription;

  @ViewChild('miInput') miInput: any;

  public selectedFile: File;
  content: string;

onFileSelected(event: Event): void {
  let files = (event.target as HTMLInputElement).files;
  this.selectedFile = files?.item(0) as File;

  const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageView = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
}

subirPost()
{
  this.postsService.addPost(this.content, this.selectedFile).subscribe(r => {
    this.miInput.nativeElement.value = null;
    this.content = '';
    this.imageView = null;
    this.postList = [...r].reverse();
    this.ngOnInit();
  })
}

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<UserState>,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
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


    this.subscriptionPosts = this.postsService.allPosts().subscribe(r => {
      this.postList = [...r].reverse();
      for (let index = 0; index < this.postList.length; index++) {
        if (this.postList[index]?.image !== null) {
          this.postList[index].image =
            'data:image/jpeg;base64,' +
            (
              this.sanitizer.bypassSecurityTrustResourceUrl(
                this.postList[index].image.fileContents
              ) as any
            ).changingThisBreaksApplicationSecurity;
        }

        if (this.postList[index]?.user.image !== null) {
          this.postList[index].user.image =
            'data:image/jpeg;base64,' +
            (
              this.sanitizer.bypassSecurityTrustResourceUrl(
                this.postList[index].user.image.fileContents
              ) as any
            ).changingThisBreaksApplicationSecurity;
        }
      }
      this.loading = false;
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionPosts) this.subscriptionPosts.unsubscribe();
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }




}
