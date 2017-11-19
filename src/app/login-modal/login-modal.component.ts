import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from 'app/_services/authentication.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {

  private destroyed: Subject<boolean> = new Subject<boolean>();

  public title = 'Login';
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private snackbarMessagingService: SnackbarMessagingService,
    private dialogRef: MatDialogRef<LoginModalComponent>) {
    this.formGroup = fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  login(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      const username = formValue['username'];
      const password = formValue['password'];
      this.auth.login(username, password)
        .takeUntil(this.destroyed)
        .subscribe(result => {
          if (result) {
              this.dialogRef.close(username);
              this.router.navigate(['articles']);
          } else {
            this.snackbarMessagingService.displayError('Failed to login', 4000);
          }
        }, error => {
            this.snackbarMessagingService.displayError('User or Password was incorrect', 4000);
        });
    } else {
      this.snackbarMessagingService.displayError('Validation errors exist', 4000);
    }
  }

}
