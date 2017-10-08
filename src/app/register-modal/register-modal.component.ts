import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialogRef, MdSnackBar } from '@angular/material';

import { AuthenticationService } from '../_services/authentication.service';

// pg 225 Angular 2 Development with Typescript
function equalValidator({value}: FormGroup): {[key: string]: any} {
  const [first, ...rest] = Object.keys(value || {});
  const valid = rest.every(v => value[v] === value[first]);
  return valid ? null : {equal: true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  title = 'Register';
  public registerGroup: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private dialogRef: MdDialogRef<RegisterModalComponent>,
    private snackBar: MdSnackBar
  ) {
    this.registerGroup = fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'passwordsGroup': fb.group({
        'password': new FormControl('', Validators.required),
        'confirmPassword': new FormControl(''),
      }, {validator: equalValidator})
    });
  }

  ngOnInit() {
  }

  register(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      const username = formValue.username;
      const password = formValue.passwordsGroup.password;

      const email = formValue.email;
      const name = formValue.name;

      this.auth.register(username, password, email, name)
        .subscribe(result => {
          if (result === true) {
              this.dialogRef.close(name);
              this.router.navigate(['articles']);
          } else {
              console.error('Failed to login, please try again')
          }
        }, error => {
          this.snackBar.open('Error! This username has already been selected', '', {
            duration: 4000
          });
        });
    }
  }
}
