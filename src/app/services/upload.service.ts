import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  postFile(fileToUpload: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    const headers = new HttpHeaders().append(
      'Content-Disposition',
      'multipart/form-data'
    );

    return this.httpClient.post(
      'https://localhost:7190/api/Auth/uploadProfilePicture',
      formData,
      { headers }
    );
  }
}
