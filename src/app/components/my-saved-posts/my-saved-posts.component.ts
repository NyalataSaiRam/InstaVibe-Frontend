import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../core/constants/constants';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { itemsList } from '../../shared/utils/itemsList';
import { CommentsComponent } from '../comments/comments/comments.component';
import { PostService } from '../../core/services/post.service';
import { environment } from '../../../environments/environment';
// import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../core/services/auth.service';
import { CommentsService } from '../../core/services/comments.service';

@Component({
  selector: 'app-my-saved-posts',
  standalone: true,
  imports: [ CommonModule, CommentsComponent ],
  templateUrl: './my-saved-posts.component.html',
  styleUrl: './my-saved-posts.component.css'
})
export class MySavedPostsComponent implements OnInit {
  viewInModal: any;
  items!: any[];
  itemId!: string;
  userDetails!: any;
  isLoading: boolean = false;
  serverUrl: string = environment.DEV_SERVER
  @ViewChild(CommentsComponent) commentComponent!: CommentsComponent;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentsService
  ) { }


  setItemID(val: any) {
    // this.itemId = val
    this.commentComponent.setItemId(val)
    this.getSavedPosts()

  }

  getSavedPosts() {
    this.isLoading = true;
    this.postService.getSavedPosts().subscribe((result: any) => {
      this.items = result;


      this.isLoading = false;
    })
  }

  deletePost(id: string) {

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


  savePost(id: string) {
    this.postService.savePost(id).subscribe(updatedUserDetails => {
      this.userDetails = updatedUserDetails
      this.getSavedPosts()
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


  ngOnInit(): void {
    this.getSavedPosts()
    this.authService.getUserDetails().subscribe(val => {
      this.userDetails = val


    })
  }


}
