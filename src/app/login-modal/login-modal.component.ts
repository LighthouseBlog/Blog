import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material'

import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  title = 'Login';
  formGroup: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<LoginModalComponent>) {
    this.formGroup = fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.auth.logout();
  }

  login(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      const username = formValue['username'];
      const password = formValue['password'];
      this.auth.login(username, password)
        .subscribe(result => {
          if (result === true) {
              this.dialogRef.close(username);
              this.router.navigate(['articles']);
          } else {
            this.snackBar.open('Failed to login', '', {
              duration: 4000
            });
          }
        }, error => {
          if (error.status === 401) {
            this.snackBar.open('User or Password was incorrect', '', {
              duration: 4000
            });
          }
        });
    }
  }

}
