import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private auth: AuthenticationService) { }

    canActivate() {
        if (this.auth.isAuthenticated) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
