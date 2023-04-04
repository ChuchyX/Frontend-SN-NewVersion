import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/Comentario';
import { ComentarioDto } from '../models/ComentarioDto';
import { Post } from '../models/Post';

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
  addLike(id: number)
  {
    return this.httpClient.post("https://localhost:7190/api/Auth/addlike", { id: id });
  }
  addComment(c: ComentarioDto) : Observable<Comentario[]>
  {
    return this.httpClient.post<Comentario[]>("https://localhost:7190/api/Auth/addcomment", c);
  }

}
