import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from 'app/_services/authentication.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

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
export class RegisterModalComponent implements OnDestroy {

  private destroyed: Subject<boolean> = new Subject<boolean>();

  public title = 'Register';
  public registerGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private dialogRef: MatDialogRef<RegisterModalComponent>,
    private snackbarMessagingSerivce: SnackbarMessagingService
  ) {
    this.registerGroup = this.fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.email),
      'name': new FormControl('', Validators.required),
      'passwordsGroup': this.fb.group({
        'password': new FormControl('', Validators.required),
        'confirmPassword': new FormControl(''),
      }, {validator: equalValidator})
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  register(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      const username = formValue.username;
      const password = formValue.passwordsGroup.password;

      const email = formValue.email;
      const name = formValue.name;

      this.auth.register(username, password, email, name)
        .takeUntil(this.destroyed)
        .subscribe(result => {
          if (result) {
              this.dialogRef.close(name);
              this.router.navigate(['articles']);
          } else {
            this.snackbarMessagingSerivce.displayError('Registration failed', 4000);
          }
        }, error => {
          this.snackbarMessagingSerivce.displayError('Error! This username has already been selected', 4000);
        });
    } else {
      this.snackbarMessagingSerivce.displayError('Validation errors exist', 4000);
    }
  }
}
