import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDto } from '../models/PostDto';
import { ReturnUser } from '../models/ReturnUser';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }


  public addPost(content: string, picture: File) : Observable<ReturnUser>
  {
    const formData = new FormData();
    // formData.append('content', JSON.stringify(content));
    formData.append('content', content);
    formData.append('picture', picture);
    return this.httpClient.post<ReturnUser>("https://localhost:7190/api/Auth/addpost", formData);
  }

}
