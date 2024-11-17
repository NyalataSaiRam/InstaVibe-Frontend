import { Component, OnInit } from '@angular/core';
import { Constants } from '../../core/constants/constants';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { PostService } from '../../core/services/post.service';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [  RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  pic = Constants.pic1
  profileForm!: FormGroup;
  file = new FormData()
  userDetails!: any;
  updateSuccessful: boolean = false;
  followers!:any;
  following!:any;
  serverUrl:string = environment.DEV_SERVER

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private postService:PostService) {
    this.profileForm = this.formBuilder.group({
      username: [ this.userDetails?.username, [ Validators.required, Validators.minLength(3) ] ],
      description: [ this.userDetails?.description, [ Validators.required, Validators.minLength(3) ] ],
    })
  }


  ngOnInit(): void {
    this.getUserDetails()
  }


  getUserDetails() {
    this.authService.getUserDetails().subscribe((res: any) => {

      this.userDetails = res;
      this.profileForm = this.formBuilder.group({
        username: [ this.userDetails?.username, [ Validators.required, Validators.minLength(3) ] ],
        description: [ this.userDetails?.description, [ Validators.required, Validators.minLength(3) ] ],
      })
    })
  }

  getFollowers(){
    this.postService.getFollower(this.userDetails._id).subscribe({
      next: (result:any) => {
        this.followers = result.followers;
      },
      error: (err) => {
        console.log(err)
      }
     })
  }

  getFollowing(){
     this.postService.getFollowing(this.userDetails._id).subscribe({
      next: (result:any) => {
        this.following = result.following;
      },
      error: (err) => {
        console.log(err)
      }
     })
  }

  removeFollowingUser(id:string){
    this.postService.removeFollowingUser(id).subscribe({
      next: (result) => {
        this.userDetails = result
        this.getFollowing()
      }
    })
  }

  removeFollowerUser(id:string){
    // console.log(id)
    
    this.postService.removeFollowerUser(id).subscribe({
      next: (result:any) => {
        this.userDetails = result.me
        this.getFollowers()
      }
    })
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.file.append('profileData', JSON.stringify(this.profileForm.value))

      this.authService.changeUserDetails(this.file).subscribe((res: any) => {
        if (res?.success) {
          this.getUserDetails();
          this.updateSuccessful = true;

          setTimeout(() => {
            this.updateSuccessful = false;
          }, 1500)
        }
      })
    }
  }

  fileChange(event: any) {
    let file = event.target.files[ 0 ]
    this.file.append('file', file)
  }

}
