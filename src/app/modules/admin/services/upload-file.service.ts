/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  SERVER_URL: string = `${environment.apiUrl}/Uploader/Upload`;
  //  SERVER_URL_AVATAR : string = `${environment.apiUrl}/File/UploadAvatar`;
  constructor(private httpClient: HttpClient) { }

  public upload(formData) {

    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      reportProgress: true,
      observe: 'events'
    });
  }
  // public uploadAvatar(formData) {

  //   return this.httpClient.post<any>(this.SERVER_URL_AVATAR, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }
}

