import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;
  postData = new FormData()
  isLoading: boolean = false;
  imageSrc!: any
  defaultImg = 'defaultImage.png'
  postFromSubmitted = false

  handleImageClick() {
    document.getElementById('display')?.click()

  }



  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) { }



  ngOnInit(): void {
    const token = sessionStorage.getItem('token')
    if (!token?.length) {
      this.router.navigateByUrl('login')
    }
    this.postForm = this.formBuilder.group({
      title: [ '', [ Validators.required ] ],
      tags: [ '', [ Validators.required ] ],

    })
  }

  handleFileChange(event: any) {
    const file: File = event.target.files[ 0 ]

    if ((file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png')) {
      if (file.size > 1000000) {
        alert('File size is too large')
        event.target.value = null

      } else {
        this.postData.append('file', file)


      }
    } else {
      event.target.value = null
      alert('Invalid file type')
    }

    if (event.target.files && event.target.files[ 0 ]) {
      const file = event.target.files[ 0 ];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  createPost() {
    let data = {
      title: this.postForm.get('title')?.value,
      tags: this.postForm.get('tags')?.value,

    }
    this.postData.append('formData', JSON.stringify(data))

    this.isLoading = true
    this.postService.createPost(this.postData).subscribe((res: any) => {

      this.postForm.reset()
      this.postData.delete('file')
      this.postData.delete('formData')
      this.imageSrc = ''
      this.isLoading = false

      this.postFromSubmitted = true
      setTimeout(() => {
        this.postFromSubmitted = false

      }, 1500)
    })

  }

}
