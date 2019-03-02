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

import { ImageSet } from '../_models/ImageSet';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

    @ViewChild(MatSidenav) sidenav: MatSidenav;

    private destroyed: Subject<boolean> = new Subject<boolean>();
    private _mobileQueryListener: () => void;

    name: string;
    image: string;
    profilePictureSet: ImageSet;
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
                this.retrieveAuthorDetails();
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
        if (window['Notification'] && (window['Notification'].permission === 'granted' || window['Notification'].permission === 'denied')) {
            this.hideSubscriptionOption = true;
        }
    }

    login() {
        this.sidenav.close();
        this.dialog.open(LoginModalComponent)
            .afterClosed()
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                if (result) {
                    this.retrieveAuthorDetails();
                }
            }, error => this.sms.displayError(error));
    }

    register() {
        this.sidenav.close();
        this.dialog.open(RegisterModalComponent, { minWidth: '30vw' })
            .afterClosed()
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => {
                this.retrieveAuthorDetails();
            });
    }

    editSettings() {
        this.sidenav.close();
        this.dialog.open(SettingsModalComponent)
            .afterClosed()
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => {
                this.retrieveAuthorDetails();
            });
    }

    loggedIn() {
        return this.auth.isAuthenticated();
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('');
        this.sms.displayErrorMessage('This session has expired');
        this.sidenav.close();
    }

    toggleSideNav() {
        this.sidenav.toggle();
        this.cdr.detectChanges();
    }

    subscribe() {
        if (this.swPush.isEnabled) {
            this.swPush
                .requestSubscription({ serverPublicKey: environment.VAPID_PUBLIC_KEY })
                .then(sub => this.auth.addPushSubscriber(sub).subscribe())
                .catch(err => this.sms.displayErrorMessage(err));
        } else {
            this.sms.displayErrorMessage('This browser does not support push notifications');
        }
    }

    private retrieveAuthorDetails() {
        this.authorService.getAuthor().subscribe(author => {
            this.name = author.name;
            if (!!author.profilePicture && !!author.profilePicture.small) {
                this.image = author.profilePicture.small;
                this.profilePictureSet = author.profilePicture;
            } else {
                this.image = environment.DEFAULT_PROFILE_PICTURE;
            }
        }, error => this.sms.displayError(error))
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth > 599 && this.sidenav.opened) {
            this.sidenav.close();
        }
    }
}
