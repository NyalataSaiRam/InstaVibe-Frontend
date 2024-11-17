import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Constants } from '../../core/constants/constants';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { itemsList } from '../../shared/utils/itemsList';
import { CommentsComponent } from '../comments/comments/comments.component';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CommentsService } from '../../core/services/comments.service';


@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [ CommonModule, CommentsComponent ],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {
  viewInModal!: any;
  items: any[] = []
  itemId!: string;
  serverUrl = environment.DEV_SERVER
  isLoading: boolean = false
  userDetails!: any;

  @ViewChild(CommentsComponent) commentComponent!: CommentsComponent;



  constructor(
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentsService
  ) { }


  setItemID(val: any) {
    this.commentComponent.setItemId(val)
    // this.itemId = val
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe((res: any) => {
      this.getUserPosts()
      this.postService.postsUpdated.next(true)
      alert(res.msg)

    })
  }

  getUserPosts() {
    this.isLoading = true
    this.postService.getUserPosts().subscribe(res => {
      this.items = res
      this.isLoading = false
      // console.log(res)
    })
  }

  updateComments(postId: string) {

    this.commentService.getCommentCount(postId).subscribe(count => {


      // Reassign to ensure UI updates with new commentsCount
      this.items = this.items.map(item =>
        item._id === postId ? { ...item, commentsCount: count } : item
      );
    });
  }



  likePost(id: string) {
    this.postService.likePost(id).subscribe({
      next: (likes: any) => {  // Assuming likes is the array from backend
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


  ngOnInit(): void {
    this.getUserPosts()
    this.authService.getUserDetails().subscribe(val => {
      this.userDetails = val
    })
  }
}
