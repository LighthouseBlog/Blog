import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDialog, MatSidenav } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from 'app/_services/authentication.service';
import { AuthorService } from 'app/_services/author.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';
import { environment } from 'environments/environment';

import { LoginModalComponent } from 'app/login-modal/login-modal.component';
import { RegisterModalComponent } from 'app/register-modal/register-modal.component';
import { SettingsModalComponent } from 'app/article-portal/settings-modal/settings-modal.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

    @ViewChild(MatSidenav) sidenav: MatSidenav;

    private destroyed: Subject<boolean> = new Subject<boolean>();
    private _mobileQueryListener: () => void;

    title = `The Lighthouse`;
    name: Promise<string>;
    image: Promise<string>;
    mobileQuery: MediaQueryList;
    hideSubscriptionOption = false;

    constructor(private auth: AuthenticationService,
                private authorService: AuthorService,
                private router: Router,
                private dialog: MatDialog,
                private cdr: ChangeDetectorRef,
                private media: MediaMatcher,
                private sms: SnackbarMessagingService,
                private swPush: SwPush) {
                    this.mobileQuery = this.media.matchMedia('(max-width: 599px)');
                    this._mobileQueryListener = () => this.cdr.detectChanges();
                    this.mobileQuery.addListener(this._mobileQueryListener);
                }

    ngOnInit() {
        this.auth.checkJwtExpiration()
            .then(() => {
                this.name = this.authorService.getAuthorName();
                this.image = this.authorService.getProfilePicture();
                this.checkNotificationPermissions();
            })
            .catch(() => {
                this.logout();
            });
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.destroyed.next();
        this.destroyed.complete();
    }

    private checkNotificationPermissions() {
        if ('Notification' in window) {
            if (window['Notification'].permission === 'granted' || window['Notification'].permission === 'denied') {
                this.hideSubscriptionOption = true;
            }
        }
    }

    login() {
        this.sidenav.close();
        this.dialog.open(LoginModalComponent)
            .afterClosed()
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                if (result) {
                    this.name = this.authorService.getAuthorName();
                    this.image = this.authorService.getProfilePicture();
                }
            }, error => this.sms.displayError(error));
    }

    register() {
        this.sidenav.close();
        this.dialog.open(RegisterModalComponent, { minWidth: '30vw'})
            .afterClosed()
            .pipe(takeUntil(this.destroyed))
            .subscribe(name => {
                if (name) {
                    this.name = Promise.resolve(name);
                    this.image = Promise.resolve(environment.DEFAULT_PROFILE_PICTURE);
                }
            });
    }

    editSettings() {
        this.sidenav.close();
        this.dialog.open(SettingsModalComponent)
            .afterClosed()
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                if (result && result.name) {
                    this.name = Promise.resolve(result.name);
                }
                if (result && result.image) {
                    this.image = Promise.resolve(result.image);
                }
            });
    }

    loggedIn() {
        return this.auth.isAuthenticated();
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
        this.sidenav.close();
    }

    toggleSideNav() {
        this.sidenav.toggle();
        this.cdr.detectChanges();
    }

    subscribe() {
        this.swPush
        .requestSubscription({ serverPublicKey: environment.VAPID_PUBLIC_KEY})
        .then(sub => this.auth.addPushSubscriber(sub).subscribe())
        .catch(err => this.sms.displayErrorMessage(err));
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth > 599 && this.sidenav.opened) {
            this.sidenav.close();
        }
    }
}
