import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  title = `Programmer's Paradise`;
  opened = true;

  @Output()
  clicked: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  onMenuClick() {
    this.clicked.emit(this.opened);
  }

  ngOnInit() {
  }

  loggedIn() {
    return localStorage.getItem('currentUser');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
