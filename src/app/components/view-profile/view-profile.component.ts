import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
// import { environment } from '../../../environments/environment.development';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CommentsService } from '../../core/services/comments.service';
import { CommentsComponent } from '../comments/comments/comments.component';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [ CommonModule, CommentsComponent ],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private commentService: CommentsService
  ) { }

  @ViewChild(CommentsComponent) commentComponent!: CommentsComponent;


  items!: any;
  isLoading: boolean = false
  serverUrl: string = environment.DEV_SERVER
  userDetails!: any;
  viewInModal: any;
  followers!: any;
  following!: any;
  priofileUserDetails!: any;


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

  setItemID(val: any) {
    // this.itemId = val
    this.commentComponent.setItemId(val)
    // this.getSavedPosts()

  }


  savePost(id: string) {
    this.postService.savePost(id).subscribe(updatedUserDetails => {
      this.userDetails = updatedUserDetails
      // this.getSavedPosts()
    })
  }


  updateComments(postId: string) {

    this.commentService.getCommentCount(postId).subscribe(count => {


      // Reassign to ensure UI updates with new commentsCount
      this.items = this.items.map((item: any) =>
        item._id === postId ? { ...item, commentsCount: count } : item
      );
    });
  }


  followAndUnfollowUser() {
    if (this.userDetails.following.includes(this.priofileUserDetails._id)) {
      this.postService.unfollowUser(this.priofileUserDetails._id).subscribe({
        next: (result: any) => {
          this.userDetails = result.me
          this.priofileUserDetails = result.other
        },
        error: (error) => {
          console.error('Error unfollowing user:', error);
        }
      })
    } else {
      this.postService.followUser(this.priofileUserDetails._id).subscribe({
        next: (result: any) => {
          this.userDetails = result.me
          this.priofileUserDetails = result.other
        },
        error: (error) => {
          console.error('Error following user:', error);
        }
      })
    }
  }

  getFollowers() {
    this.postService.getFollower(this.priofileUserDetails._id).subscribe({
      next: (result: any) => {
        this.followers = result.followers;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getFollowing() {
    this.postService.getFollowing(this.priofileUserDetails._id).subscribe({
      next: (result: any) => {
        this.following = result.following;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  ngOnInit(): void {
    this.isLoading = true
    this.authService.getUserDetails().subscribe(val => {
      this.userDetails = val


      this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('id')
        if (id && id !== this.userDetails._id) {

          this.postService.getProfilePosts(id).subscribe({
            next: (posts: any) => {
              this.items = posts.updated_posts
              this.priofileUserDetails = posts.userDetials
              this.isLoading = false
            },
            error: (error) => {
              console.log(error)
              this.isLoading = false
            }
          })
        } else {
          this.router.navigate([ 'profile' ])
          this.isLoading = false
        }
      })
    })

  }

}
