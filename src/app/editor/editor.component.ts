import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public editing = false;
  public options: Object = {
    placeholderText: 'Edit Content Here',
    charCounterCount: true
  };
  private content: Object;

  constructor() { }

  ngOnInit() {
    this.editing = true;
    this.options['events'] = {
      'froalaEditor.contentChanged': (e, editor) => {
        this.updateContent(editor);
      }
    };
  }

  updateContent(editor) {
    this.content = editor.html.get();
  }

  saveArticle() {

  }

  previewArticle() {

  }

}
