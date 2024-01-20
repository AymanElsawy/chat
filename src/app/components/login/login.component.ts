import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private AuthService = inject(AuthService);
  private router = inject(Router);


  loginForm!: FormGroup;
  errorMessage!: string;
  ngOnInit(): void {
    this.formInit(); // init form
  }
  formInit() {
    this.loginForm = new FormGroup({ // init form
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    const { username, password } = this.loginForm.value; // get form value
    this.AuthService.login(username, password).subscribe({ // login
      next: (res) => {
        res ? this.router.navigate(['/home']) : this.router.navigate(['/']); // navigate to home if true
      },
      error: (err) => {
        this.errorMessage = err.error.message; // set error
      }
    })

  }
}
