import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { AuthenticationService } from '../_services/authentication.service';

import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  title = `Lighthouse`;
  opened = true;

  @Output()
  clicked: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private dialog: MdDialog
  ) { }

  onMenuClick() {
    this.clicked.emit(this.opened);
  }

  ngOnInit() {
    this.auth.checkJwtExpiration()
      .then(result => {
        console.log('Result', result);
      })
      .catch(err => {
        console.error(err);
        this.logout();
      })
  }

  login() {
    this.dialog.open(LoginModalComponent);
  }

  register() {
    this.dialog.open(RegisterModalComponent);
  }

  editSettings() {
    this.dialog.open(SettingsModalComponent);
  }

  loggedIn() {
    return localStorage.getItem('currentUser');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
