import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  formGroup: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private auth: AuthenticationService) {
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
      console.log('Logging in');
      this.auth.login(username, password)
        .subscribe(result => {
          if (result === true) {
              this.router.navigate(['articles']);
          } else {
              console.error('Failed to login, please try again')
          }
        });
    }
  }

}
