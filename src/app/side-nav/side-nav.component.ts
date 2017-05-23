import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  opened = false;

  clicked(event) {
    //console.log('clicked called', event, this.opened);
    //this.opened = event;
    this.opened = !this.opened;
    //this.opened = true;
  }

  onSidebarClose() {
    //console.log('onsidebarclose called', this.opened);
    this.opened = false;
  }

  ngOnInit() {
  }

}
