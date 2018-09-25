import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from 'app/_services/authentication.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

// pg 225 Angular 2 Development with Typescript
function equalValidator({ value }: FormGroup): { [key: string]: any } {
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : { equal: true };
}

@Component({
    selector: 'register-modal',
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    title = 'Register';
    registerGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private auth: AuthenticationService,
                private dialogRef: MatDialogRef<RegisterModalComponent>,
                private sms: SnackbarMessagingService) {
        this.registerGroup = this.fb.group({
            'username': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.email),
            'name': new FormControl('', Validators.required),
            'passwordsGroup': this.fb.group({
                'password': new FormControl('', Validators.required),
                'confirmPassword': new FormControl(''),
            }, { validator: equalValidator })
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
                .pipe(takeUntil(this.destroyed))
                .subscribe(result => {
                    if (result) {
                        this.dialogRef.close(name);
                        this.sms.displaySuccess('Registration Succeeded', 2000);
                        this.router.navigate(['articles']);
                    } else {
                        this.sms.displayErrorMessage('Registration failed', 4000);
                    }
                }, error => this.sms.displayError(error, 4000));
        } else {
            this.sms.displayErrorMessage('Validation errors exist', 4000);
        }
    }
}
