import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { EditorService } from '../_services/editor.service';
import { ArticleService } from '../_services/article.service';
import { ImagesService } from '../_services/images.service';

import initializeFroalaGistPlugin from '../_plugins/gist.plugin'

import { environment } from '../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private tb = ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',
  'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle',
  'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
  'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile',
  'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll',
  'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', 'github']
  private options: Object = {
    heightMin: 400,
    placeholderText: 'Edit Content Here',
    charCounterCount: true,
    htmlRemoveTags: [],
    toolbarInline: false,
    events: {
      'froalaEditor.contentChanged': (e, editor) => {
        this.updateContent(editor);
      },
      'froalaEditor.image.removed': (e, editor, $img) => {
        const src = $img.attr('src');
        this.imagesService.deleteImage(src)
          .subscribe(result => {
            console.log('Result', result);
          })
      }
    },
    toolbarButtons: this.tb,
    toolbarButtonsMD: this.tb,
    toolbarButtonsSM: this.tb,
    toolbarButtonsXS: this.tb,
  };
  private content: string;

  public editorContent: string;
  public editing = false;
  public formGroup: FormGroup;
  public initControls: any;

  constructor(
    private editorService: EditorService,
    private articleService: ArticleService,
    private imagesService: ImagesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.fb.group({
      'articleTitle': new FormControl('', Validators.required),
      'articleDescription': new FormControl('', Validators.required)
    });
  }

  public initialize(initControls) {
    this.imagesService.getHash()
      .subscribe(hash => {
        this.options['imageUploadToS3'] = hash;

        this.initControls = initControls;
        console.log('Initializing!', initControls);
        this.initControls.initialize();
      });
  }

  ngOnInit() {
    initializeFroalaGistPlugin(this.editorService);
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
      const articleTitle = formValue['articleTitle'];
      const articleDescription = formValue['articleDescription'];

      this.editorService.setArticleTitle(articleTitle);
      this.editorService.setArticleDescription(articleDescription);

      this.editorService.saveArticle(this.content)
        .subscribe(result => {
          if (result['text'] === this.content) {
              this.snackBar.open('Successfully saved article', '', {
                duration: 4000
              });
          } else {
              console.error('Failed to save article, please try again');
          }
        }, error => {
          this.snackBar.open('There was an error while attempting to save this article', '', {
            duration: 4000
          });
        });
    } else {
      console.error('Form is not valid', formValue);
    }
  }

  previewArticle() {

  }

}
