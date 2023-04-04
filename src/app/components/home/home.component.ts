import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/auth/auth.UserState';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { PostDto } from 'src/app/models/PostDto';
import { Post } from 'src/app/models/Post';
import { ComentarioDto } from 'src/app/models/ComentarioDto';

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
  private subscriptionLikes: Subscription;
  private subscriptionComment: Subscription;

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

  subirPost() {
    this.subscriptionPosts = this.postsService
      .addPost(this.content, this.selectedFile)
      .subscribe((r) => {
        this.miInput.nativeElement.value = null;
        this.content = '';
        this.imageView = null;
        this.postList = [...r].reverse();
        this.ngOnInit();
      });
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

    this.subscriptionPosts = this.postsService.allPosts().subscribe((r) => {
      this.postList = [...r].reverse();
      console.log(r);
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

        this.postList[index].date = new Date(this.postList[index].date);

        for (let index2 = 0; index2 < this.postList[index].comentarios.length; index2++)
        {
          this.postList[index].comentarios[index2].date = new Date(this.postList[index].comentarios[index2].date);
        }
      }
      this.loading = false;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionPosts) this.subscriptionPosts.unsubscribe();
    if (this.subscriptionLikes) this.subscriptionLikes.unsubscribe();
    if (this.subscriptionComment) this.subscriptionComment.unsubscribe();
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  convert(date: Date): string {
    if (date.getMonth() === 0) return 'Jan';
    if (date.getMonth() === 1) return 'Feb';
    if (date.getMonth() === 2) return 'Mar';
    if (date.getMonth() === 3) return 'Apr';
    if (date.getMonth() === 4) return 'May';
    if (date.getMonth() === 5) return 'Jun';
    if (date.getMonth() === 6) return 'Jul';
    if (date.getMonth() === 7) return 'Aug';
    if (date.getMonth() === 8) return 'Sept';
    if (date.getMonth() === 9) return 'Oct';
    if (date.getMonth() === 10) return 'Nov';
    if (date.getMonth() === 11) return 'Dec';
    return '';
  }

  addLike(post: Post)
  {
    this.subscriptionLikes = this.postsService.addLike(post.id).subscribe(r => {});
    const index = this.postList.findIndex(p => p.id === post.id);
    this.postList[index].likes++;
  }

  addComment(post: Post)
  {
    const index = this.postList.findIndex(p => p.id === post.id);
    let com = new ComentarioDto();
    com.content = post.comment;
    post.comment = '';
    com.postid = this.postList[index].id;
    com.userid = this.postList[index].user.id;
    this.subscriptionComment = this.postsService.addComment(com).subscribe((c) => {
      this.postList[index].comentarios = [...c].reverse();

        for (let index2 = 0; index2 < this.postList[index].comentarios.length; index2++)
        {
          this.postList[index].comentarios[index2].date = new Date(this.postList[index].comentarios[index2].date);
        }
    });
  }


  showComments(post: Post){
    const index = this.postList.findIndex(p => p.id === post.id);
    this.postList[index].showComments = !this.postList[index].showComments;
  }


}
