import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../core/services/post.service';
// import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from '../comments/comments/comments.component';
import { CommentsService } from '../../core/services/comments.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [ CommonModule, CommentsComponent ],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {

  items!: any;
  userDetails!: any;
  isLoading = false
  serverUrl: string = environment.DEV_SERVER
  // serverUrl:string = environment.DEV_SERVER

  @ViewChild(CommentsComponent) commentComponent!: CommentsComponent;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentsService
  ) { }

  ngOnInit(): void {
    this.getFavouritePosts()
    this.authService.getUserDetails().subscribe(val => {
      this.userDetails = val
    })
  }

  getFavouritePosts() {
    this.postService.getFavouritePosts().subscribe(favPosts => {
      // console.log(favPosts);
      this.items = favPosts
    })
  }

  setItemID(val: any) {
    this.commentComponent.setItemId(val)
  }

  likePost(id: string) {
    this.postService.likePost(id).subscribe((likes: any) => {  // Assuming likes is the array from backend
      this.items = this.items.map((item: any) => {
        if (item._id === id) {
          return { ...item, likes: likes }; // Update likes directly from the response
        }
        return item;
      });
      this.getFavouritePosts()
    }, (error) => {
      console.error('Error updating likes:', error); // Handle error case
    });
  }


  updateComments(postId: string) {

    this.commentService.getCommentCount(postId).subscribe(count => {


      // Reassign to ensure UI updates with new commentsCount
      this.items = this.items.map((item: any) =>
        item._id === postId ? { ...item, commentsCount: count } : item
      );
    });
  }

  savePost(id: string) {
    this.postService.savePost(id).subscribe(updatedUserDetails => {
      this.userDetails = updatedUserDetails
    })
  }


}
