import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
// import { environment } from '../../../environments/environment.development';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient,
    private router: Router

  ) { }

  serverUrl = environment.DEV_SERVER;

  postsUpdated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getPosts(page: number): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}`,
      'x_page': page
    })

    return this.httpClient.get(`${this.serverUrl}/post`, { headers })
  }

  createPost(data: any): Observable<any> | Observable<string> {
    let token = sessionStorage.getItem('token')
    if (!token?.length) { this.router.navigateByUrl('login'); return of('') };

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })

    return this.httpClient.post(this.serverUrl + '/post', data, { headers })
  }

  getUserPosts(): Observable<any> | Observable<string> {
    let token = sessionStorage.getItem('token')
    if (!token?.length) { this.router.navigateByUrl('login'); return of('') };

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })

    return this.httpClient.get(this.serverUrl + '/post/myposts', { headers })
  }

  getFavouritePosts(): Observable<any> {
    let token = sessionStorage.getItem('token')
    if (!token?.length) { this.router.navigateByUrl('login'); return of('') };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(this.serverUrl + '/post/favourites', { headers })
  }

  deletePost(id: string): Observable<any> {
    let token = sessionStorage.getItem('token')
    let headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`
    })



    return this.httpClient.delete(`${this.serverUrl}/post/${id}`, { headers })
  }

  searchByText(input: string): Observable<any> {

    const token = sessionStorage.getItem('token')

    return this.httpClient.get(this.serverUrl + `/post/search/${input}`, {
      headers: new HttpHeaders({
        'Authorization': `bearer ${token}`
      })
    }).pipe(catchError(this.handleError), map(d => d.posts))
  }

  likePost(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.put(this.serverUrl + '/post/like/' + id, null, { headers })
  }

  savePost(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.put(this.serverUrl + '/post/save/' + id, null, { headers })
  }

  getSavedPosts(): Observable<any> {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(this.serverUrl + '/post/savedPosts', { headers })
  }

  getProfilePosts(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${this.serverUrl}/viewProfile/${id}`, { headers })
  }

  getProfileUserDetails(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${this.serverUrl}/viewProfile/userDetails/${id}`, { headers })
  }

  followUser(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${this.serverUrl}/post/followUser/${id}`, { headers })

  }

  unfollowUser(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${this.serverUrl}/post/unfollowUser/${id}`, { headers })
  }

  getFollower(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${this.serverUrl}/user/followers/${id}`, { headers })
  }

  getFollowing(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get(`${this.serverUrl}/user/following/${id}`, { headers })
  }

  removeFollowingUser(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.delete(`${this.serverUrl}/user/following/${id}`, { headers })
  }

  removeFollowerUser(id: string) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.delete(`${this.serverUrl}/user/followers/${id}`, { headers })
  }

  recentPostsFromFollowing() {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get(`${this.serverUrl}/post/getRecentPostsFromFollowing`, { headers })
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
