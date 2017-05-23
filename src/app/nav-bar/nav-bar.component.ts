import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title = "Programmer's Paradise";
  opened = true;

  @Output()
  clicked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  onMenuClick() {
    this.clicked.emit(this.opened);
  }

  ngOnInit() {
  }

}
