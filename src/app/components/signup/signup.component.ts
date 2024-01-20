import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private AuthService = inject(AuthService);
  private router = inject(Router);


  signupForm!: FormGroup;
  errorMessage!: string;
  ngOnInit(): void {
    this.formInit(); // init form
  }
  formInit() {
    this.signupForm = new FormGroup({ // init form
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
     repeat_password: new FormControl('', Validators.required)
    })
  }

  signup() {
    const { username, password , repeat_password} = this.signupForm.value; // get form value
    this.AuthService.signup(username, password , repeat_password).subscribe({
      next: (res) => {
        res ? this.router.navigate(['/home']) : this.router.navigate(['/']); // navigate to home if true
      },
      error: (err) => {
        this.errorMessage = err.error.message; // set error
      }
    })

  }
}
