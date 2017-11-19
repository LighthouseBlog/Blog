import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from 'app/_services/authentication.service';
import { AuthorService } from 'app/_services/author.service';
import { environment } from 'environments/environment';

import { LoginModalComponent } from 'app/login-modal/login-modal.component';
import { RegisterModalComponent } from 'app/register-modal/register-modal.component';
import { SettingsModalComponent } from 'app/article-portal/settings-modal/settings-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private destroyed: Subject<boolean> = new Subject<boolean>();

  public title = `The Lighthouse`;
  public name: Promise<string>;
  public image: Promise<string>;

  constructor(
    private auth: AuthenticationService,
    private authorService: AuthorService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.auth.checkJwtExpiration()
      .then(result => {
        this.name = this.authorService.getAuthorName();
        this.image = this.authorService.getProfilePicture();
      })
      .catch(() => {
        this.logout();
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  login() {
    this.dialog.open(LoginModalComponent, {
      minWidth: '30vw'
    }).afterClosed()
      .takeUntil(this.destroyed)
      .subscribe(result => {
        if (result) {
          this.name = this.authorService.getAuthorName(result);
          this.image = this.authorService.getProfilePicture(result);
        }
      });
  }

  register() {
    this.dialog.open(RegisterModalComponent, {
      minHeight: '55vh',
      width: '25vw',
      minWidth: '300px'
    }).afterClosed()
      .takeUntil(this.destroyed)
      .subscribe(result => {
        if (result) {
          this.name = Promise.resolve(result.name);
          this.image = Promise.resolve(environment.DEFAULT_PROFILE_PICTURE);
        }
      });
  }

  editSettings() {
    this.dialog.open(SettingsModalComponent, {
      minWidth: '40vw'
    }).afterClosed()
      .takeUntil(this.destroyed)
      .subscribe(result => {
        if (result.name) {
          this.name = Promise.resolve(result.name);
        }
        if (result.image) {
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
  }

}
