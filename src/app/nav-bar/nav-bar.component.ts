import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from 'app/_services/authentication.service';
import { AuthorService } from 'app/_services/author.service';
import { environment } from 'environments/environment';

import { LoginModalComponent } from 'app/public/login-modal/login-modal.component';
import { RegisterModalComponent } from 'app/public/register-modal/register-modal.component';
import { SettingsModalComponent } from 'app/article-portal/settings-modal/settings-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  title = `Lighthouse`;
  opened = true;
  name: Promise<string>;
  image: Promise<string>;

  @Output()
  clicked: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private auth: AuthenticationService,
    private authorService: AuthorService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  onMenuClick() {
    this.clicked.emit(this.opened);
  }

  ngOnInit() {
    this.auth.checkJwtExpiration()
      .then(result => {
        this.name = this.authorService.getAuthorName();
        this.image = this.authorService.getProfilePicture();
      })
      .catch(error => {
        if (error) {
          console.error('Error', error);
        }
        this.logout();
      });
  }

  login() {
    this.dialog.open(LoginModalComponent).afterClosed()
      .subscribe(result => {
        if (result) {
          this.name = this.authorService.getAuthorName(result);
          this.image = this.authorService.getProfilePicture(result);
        }
      });
  }

  register() {
    this.dialog.open(RegisterModalComponent).afterClosed()
      .subscribe(result => {
        if (result) {
          this.name = Promise.resolve(result.name);
          this.image = Promise.resolve(environment.DEFAULT_PROFILE_PICTURE);
        }
      });
  }

  editSettings() {
    this.dialog.open(SettingsModalComponent).afterClosed()
      .subscribe(result => {
        if (result) {
          this.name = Promise.resolve(result.name);
          this.image = Promise.resolve(result.image || environment.DEFAULT_PROFILE_PICTURE);
        }
      });
  }

  loggedIn() {
    return localStorage.getItem('currentUser');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
