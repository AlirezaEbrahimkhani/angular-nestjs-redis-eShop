import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from '../../../shared';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() changeTab = new EventEmitter<number>();

  form = this.fb.group({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onRegister() {
    this.authService
      .register(this.form.value)
      .subscribe((res: ApiResponse<[]>) => {
        if (res.Success) {
          this.snackBar.open('Register Successfully ... !', 'x', {
            duration: 1500,
          });
          this.changeTab.emit(0);
        } else
          this.snackBar.open('Somthing is wrong. Please try again ... !', 'x', {
            duration: 1500,
          });
      });
  }
}
