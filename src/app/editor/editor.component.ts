import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

import { EditorService } from '../_services/editor.service';
import { ArticleService } from '../_services/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public editing = false;
  public options: Object = {
    placeholderText: 'Edit Content Here',
    charCounterCount: true,
    heightMin: 400
  };
  private content: string;
  public editorContent: string;
  formGroup: FormGroup;

  constructor(
    private editorService: EditorService,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      'articleTitle': new FormControl('', Validators.required),
      'articleDescription': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.editing = true;
    this.options['events'] = {
      'froalaEditor.contentChanged': (e, editor) => {
        this.updateContent(editor);
      }
    };
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.editorService.setArticleId(params['id']);

      this.articleService.getArticle(id)
        .subscribe(article => {
          this.formGroup.setValue({
            'articleTitle': article.title,
            'articleDescription': article.description
          });
          this.editorContent = article.text;
        })
    });
  }

  updateContent(editor) {
    this.content = editor.html.get();
  }

  saveArticle(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      console.log('Saving Article');

      const articleTitle = formValue['articleTitle'];
      const articleDescription = formValue['articleDescription'];

      this.editorService.setArticleTitle(articleTitle);
      this.editorService.setArticleDescription(articleDescription);

      this.editorService.saveEdits(this.content)
        .subscribe(result => {
          if (result['text'] === this.content) {
              console.log('Successfully saved');
          } else {
              console.error('Failed to save article, please try again');
          }
        });
    } else {
      console.error('Form is not valid', formValue);
    }
  }

  previewArticle() {

  }

}
