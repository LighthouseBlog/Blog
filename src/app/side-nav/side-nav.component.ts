import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  opened = false;

  clicked(event) {
    this.opened = !this.opened;
  }

  retrieveArticles() {
  }

  onClose() {
    this.opened = false;
  }

  ngOnInit() {
    this.retrieveArticles();
  }

}
