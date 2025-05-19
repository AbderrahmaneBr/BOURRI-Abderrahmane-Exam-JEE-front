import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = {
      email: this.username,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.token);

        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      },
    });
  }
}
