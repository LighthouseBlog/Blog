import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from 'app/_services/authentication.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public title = 'Login';
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private auth: AuthenticationService,
                private sms: SnackbarMessagingService,
                private dialogRef: MatDialogRef<LoginModalComponent>) {
        this.formGroup = this.fb.group({
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
                .pipe(takeUntil(this.destroyed))
                .subscribe(result => {
                    if (result) {
                        this.dialogRef.close(username);
                        this.sms.displaySuccess('Login Sucessful', 2000);
                        this.router.navigate(['articles']);
                    } else {
                        this.sms.displayErrorMessage('Failed to login', 4000);
                    }
                }, error => {
                    this.sms.displayError(error, 20000)
                });
        } else {
            this.sms.displayErrorMessage('Validation errors exist', 4000);
        }
    }

}
