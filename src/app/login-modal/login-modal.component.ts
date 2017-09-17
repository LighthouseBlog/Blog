import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialogRef } from '@angular/material'

import { AuthenticationService } from '../_services/authentication.service';

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
    private snackBar: MdSnackBar,
    private dialogRef: MdDialogRef<LoginModalComponent>) {
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
              this.dialogRef.close('closed');
              this.router.navigate(['articles']);
          } else {
              console.error('Error (result is false?)');
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
