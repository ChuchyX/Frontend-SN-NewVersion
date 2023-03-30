import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }


  public addPost(content: string, picture: File) : Observable<any>
  {
    const formData = new FormData();
    // formData.append('content', JSON.stringify(content));
    formData.append('content', content);
    formData.append('picture', picture);
    return this.httpClient.post("https://localhost:7190/api/Auth/addpost", formData);
  }

  allPosts(): Observable<any>
  {
    return this.httpClient.get("https://localhost:7190/api/Auth/allposts");
  }

}
