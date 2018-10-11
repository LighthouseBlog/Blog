import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { SnackbarMessagingService } from '../_services/snackbar-messaging.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private auth: AuthenticationService,
                private sms: SnackbarMessagingService) { }

    canActivate() {
        if (this.auth.isAuthenticated) {
            return true;
        }
        this.router.navigateByUrl('');
        this.sms.displayErrorMessage('You are not authenticated to access that page');
        return false;
    }
}
