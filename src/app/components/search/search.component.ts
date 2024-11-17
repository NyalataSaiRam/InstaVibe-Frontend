import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from '../comments/comments/comments.component';
import { PostService } from '../../core/services/post.service';
import { environment } from '../../../environments/environment.development';
import { CommentsService } from '../../core/services/comments.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ FormsModule, NgOptimizedImage, CommonModule, CommentsComponent ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchText = ''
  catelog = ''
  isLoading = false;
  Msg: string = ""


  items!: any[];
  itemId!: string;
  userDetails!: any;
  serverUrl = environment.DEV_SERVER


  constructor(
    private postService: PostService,
    private commentService: CommentsService,
    private authService: AuthService
  ) { }

  @ViewChild(CommentsComponent) commentComponent!: CommentsComponent;


  setItemID(val: any) {
    this.commentComponent.setItemId(val)
  }

  updateComments(postId: string) {

    this.commentService.getCommentCount(postId).subscribe(count => {


      // Reassign to ensure UI updates with new commentsCount
      this.items = this.items.map(item =>
        item._id === postId ? { ...item, commentsCount: count } : item
      );
    });
  }

  searchByText(value: string) {
    this.isLoading = true
    this.postService.searchByText(value).subscribe(val => {
      if (val?.length === 0) {
        this.isLoading = false
        this.Msg = "No results found"
      } else {
        this.Msg = ''
        this.items = val
        this.isLoading = false
      }
    })
  }

  // console.log(val)
  searchByCatelog(catelog: string) {
    this.isLoading = true
    this.postService.searchByText(catelog).subscribe(val => {
      this.items = val
      this.isLoading = false
    })
  }

  likePost(id: string) {
    this.postService.likePost(id).subscribe(
      {
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
      }
    );
  }

  savePost(id: string) {
    this.postService.savePost(id).subscribe(updatedUserDetails => {
      this.userDetails = updatedUserDetails
    })
  }



  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(val => {
      this.userDetails = val

    })
  }


}
