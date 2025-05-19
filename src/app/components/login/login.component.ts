import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const params = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

    this.http
      .post<{ 'access-token': string }>(
        'http://localhost:8080/auth/login',
        params
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem('access-token', response['access-token']);
          this.router.navigate(['/dashboard']); // or any secure route
        },
        error: () => {
          this.error = 'Invalid username or password';
        },
      });
  }
}
