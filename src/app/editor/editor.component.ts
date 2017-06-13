import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EditorService } from '../_services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public editing = false;
  public options: Object = {
    placeholderText: 'Edit Content Here',
    charCounterCount: true,
    heightMin: 400
  };
  private content: string;

  constructor(
    private editorService: EditorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.editing = true;
    this.options['events'] = {
      'froalaEditor.contentChanged': (e, editor) => {
        this.updateContent(editor);
      }
    };
    this.route.params.subscribe(params => {
      this.editorService.setArticleId(params['id']);
    });
  }

  updateContent(editor) {
    this.content = editor.html.get();
  }

  saveArticle() {
    console.log('Saving Article');
    console.log('content', this.content);
    this.editorService.saveEdits(this.content)
      .subscribe(result => {
        if (result === true) {
            console.log('Successfully saved');
        } else {
            console.error('Failed to login, please try again');
        }
      });
  }

  previewArticle() {

  }

}
