import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  opened = false;

  clicked(event) {
    this.opened = event;
  }

  onSidebarClose() {
    console.log('Called', this.opened);
    this.opened = false;
  }

  ngOnInit() {
  }

}
