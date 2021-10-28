import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../core';
import { ApiResponse } from '../../../shared';
import { LoginResponse } from '../../shared/api/login.response';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() changeTab = new EventEmitter<number>();

  form = this.fb.group({
    username: '',
    password: '',
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  onLogin() {
    this.authService
      .login(this.form.value)
      .subscribe((res: ApiResponse<LoginResponse>) => {
        const { Success, Data } = res;
        if (Success) {
          this.snackBar.open('Login Successfully ... !', 'x', {
            duration: 1500,
          });
          this.userService.setLoggedIn = true;
          this.userService.setUser = Data;
          this.router.navigate(['/']);
        } else
          this.snackBar.open('Username/Password is wrong ... !', 'x', {
            duration: 1500,
          });
      });
  }
}
