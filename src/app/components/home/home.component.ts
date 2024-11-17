import { ChangeDetectorRef, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Constants } from '../../core/constants/constants';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BlurImageDirective } from '../../shared/directives/blur-image.directive';
import { CommentsComponent } from '../comments/comments/comments.component';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
// import { environment } from '../../../environments/environment.development';
import { CommentsService } from '../../core/services/comments.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgOptimizedImage, BlurImageDirective, CommonModule, CommentsComponent, RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pic1 = Constants.pic1
  pageCount: number = 1
  isLoading = false
  likedClass = "bi bi-heart-fill text-danger me-4";


  @ViewChild(CommentsComponent) commentComponent!: CommentsComponent;

  itemId!: string;
  items: any[] = []
  recentPostsFromFollowing!: any[];
  userDetails!: any;
  serverUrl = environment.DEV_SERVER



  constructor(
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentsService
  ) { }

  setItemID(val: any) {
    this.commentComponent.setItemId(val)

  }

  updateComments(postId: string) {

    this.commentService.getCommentCount(postId).subscribe(count => {

      this.getRecentPostsFromFollowing()
      // Reassign to ensure UI updates with new commentsCount
      this.items = this.items.map(item =>
        item._id === postId ? { ...item, commentsCount: count } : item
      );

    });
  }

  getRecentPostsFromFollowing() {
    this.postService.recentPostsFromFollowing().subscribe({
      next: (data: any) => {
        this.recentPostsFromFollowing = data;
      }
    })
  }




  loadMore() {
    this.pageCount += 1
    this.getPosts()
  }

  getPosts() {
    this.isLoading = true
    this.postService.getPosts(this.pageCount).subscribe(val => {
      this.items = [ ...this.items, ...val ]
      this.isLoading = false
    })
  }

  ngOnInit(): void {
    this.getPosts()
    this.getRecentPostsFromFollowing()
    this.authService.getUserDetails().subscribe(val => {
      this.userDetails = val
      console.log(this.userDetails)

    })
  }

  likePost(id: string) {
    this.postService.likePost(id).subscribe({
      next: (likes: any) => {  // Assuming likes is the array from backend
        this.getRecentPostsFromFollowing()
        this.items = this.items.map((item: any) => {
          if (item._id === id) {
            return { ...item, likes: likes }; // Update likes directly from the response
          }
          return item;
        });

      },
      error: (error) => {
        console.error('Error updating likes:', error); // Handle error case
      }
    });
  }



  savePost(id: string) {
    this.postService.savePost(id).subscribe(updatedUserDetails => {
      this.userDetails = updatedUserDetails
    })
  }



}
