import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editing = false;

  constructor() { }

  ngOnInit() {
    this.editing = true;
  }

  saveArticle() {

  }

  previewArticle() {

  }

}
