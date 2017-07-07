import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

import { EditorService } from '../_services/editor.service';
import { ArticleService } from '../_services/article.service';
import { ImagesService } from '../_services/images.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private froalaOptions: Object = {
    heightMin: 400,
    placeholderText: 'Edit Content Here',
    charCounterCount: true,
    events: {
      'froalaEditor.contentChanged': (e, editor) => {
        this.updateContent(editor);
      }
    }
  };
  private content: string;

  public editorContent: string;
  public editing = false;
  public formGroup: FormGroup;
  public options: any;

  constructor(
    private editorService: EditorService,
    private articleService: ArticleService,
    private imagesService: ImagesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      'articleTitle': new FormControl('', Validators.required),
      'articleDescription': new FormControl('', Validators.required)
    });
    this.options = this.getOptions();
  }

  getOptions() {
    return new Promise((resolve) => {
      this.imagesService.getHash()
        .subscribe(hash => {
          this.froalaOptions['imageUploadToS3'] = hash;
          resolve(this.froalaOptions);
        });
    });
  }

  ngOnInit() {
    this.editing = true;
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

      this.editorService.saveArticle(this.content)
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
