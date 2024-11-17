import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient:HttpClient) { }

  //gets specified post comments
  getComments(postId: string):Observable<any>{

    const token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${environment.DEV_SERVER}/comment/${postId}`, {headers}).pipe(catchError(this.handleError))
  }

  addComments(comment:any){
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.post(`${environment.DEV_SERVER}/comment`, comment, {headers}).pipe(catchError(this.handleError))
  }

  getCommentCount(postId:string):Observable<any>{

    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${environment.DEV_SERVER}/post/commentsCount/${postId}`, {headers}).pipe(catchError(this.handleError))
  }


  handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      console.log('Client side Error', err.error.message)
      errMsg = err.error.message;

    } else {
      errMsg = 'sever side error';

    }

    return throwError(() => errMsg)
  }
}

