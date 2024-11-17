import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }
  signupForm!: FormGroup;

  success!: any;



  signup() {
    console.log(this.signupForm?.value)
    //  this.authService.singup(this.signupForm.value).subscribe(data => console.log(data), err => console.log(err))
    this.authService.singup(this.signupForm.value).subscribe(data => {
      this.success = data.success
    }, err => {
      console.log(err)

    })

    this.signupForm.reset()

  }




  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: [ '', [ Validators.required, Validators.minLength(3) ] ],
      email: [ '', [ Validators.required, this.validateEmail ] ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ '', [ Validators.required ] ],
    }, { validators: this.validatePassword })
  }



  validateEmail(c: FormControl) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isPatterMatched = emailRegex.test(c.value)
    if (!isPatterMatched) return { invalidEmail: { message: 'Invalid email' } }
    return null;
  }

  validatePassword(form: FormGroup) {
    const pass1 = form.get('password')?.value;

    const pass2 = form.get('confirmPassword')?.value;


    return (pass1 === pass2) ? null : { invalidPassword: true };
  }

}

