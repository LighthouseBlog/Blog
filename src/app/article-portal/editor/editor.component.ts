import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { EditorService } from 'app/_services/editor.service';
import { ArticleService } from 'app/_services/article.service';
import { ImagesService } from 'app/_services/images.service';

import initializeFroalaGistPlugin from 'app/_plugins/gist.plugin'

import { environment } from 'environments/environment';
import { FileValidator } from 'app/_directives/fileValidator.directive';
import { ImagePreviewComponent } from 'app/article-portal/image-preview/image-preview.component';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

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
  public filteredTags: Observable<string[]>;
  public selectedTags: Set<string>;
  public tagInput: string;
  public removable = true;
  public image: any;

  constructor(
    private editorService: EditorService,
    private articleService: ArticleService,
    private imagesService: ImagesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarMessageService: SnackbarMessagingService,
    public dialog: MatDialog
  ) {
    this.formGroup = this.fb.group({
      'articleTitle': new FormControl('', Validators.required),
      'articleDescription': new FormControl('', Validators.required),
      'tags': new FormControl(''),
      'coverPhoto': new FormControl('', [FileValidator.validate])
    });
  }

  public initialize(initControls) {
    this.imagesService.getHash()
      .subscribe(hash => {
        this.options['imageUploadToS3'] = hash;

        this.initControls = initControls;
        this.initControls.initialize();
      });
  }

  ngOnInit() {
    this.selectedTags = new Set<string>();
    this.formGroup.get('tags').valueChanges
      .subscribe((input) => {
        this.filteredTags = this.filterTags(input);
      });

    initializeFroalaGistPlugin(this.editorService);
    this.editing = true;
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.editorService.setArticleId(params['id']);

      this.articleService.getArticle(id)
        .subscribe(article => {
          this.formGroup.setValue({
            'articleTitle': article.title,
            'articleDescription': article.description,
            'tags': '',
            'coverPhoto': {}
          });
          this.image = article.coverPhoto;
          if (article.tags instanceof Array) {
            this.selectedTags = new Set<string>(article.tags);
          }
          this.editorContent = article.text;
        });
    });
  }

  updateContent(editor) {
    this.content = editor.html.get();
  }

  saveArticle(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      const articleTitle = formValue['articleTitle'];
      const articleDescription = formValue['articleDescription'];
      const coverPhoto = formValue['coverPhoto'];
      const tags = Array.from(this.selectedTags);

      if (coverPhoto.target) {
        const formData = new FormData();
        const file = coverPhoto.target.files[0];
        formData.append('coverPhoto', file);

        this.editorService.saveArticle(this.content, articleTitle, articleDescription, tags, formData)
        .subscribe(result => {
          this.snackbarMessageService.displayError('Successfully saved article', 4000);
        }, error => {
          this.snackbarMessageService.displayError('There was an error while attempting to save this article', 4000);
        });
      } else {
        this.editorService.saveArticle(this.content, articleTitle, articleDescription, tags)
        .subscribe(result => {
          this.snackbarMessageService.displayError('Successfully saved article', 4000);
        }, error => {
          this.snackbarMessageService.displayError('There was an error while attempting to save this article', 4000);
        });
      }
    }
  }

  publishArticle() {
    this.editorService.publishArticle()
    .subscribe(result => {
      this.snackbarMessageService.displayError('Successfully published article', 4000);
    }, error => {
      this.snackbarMessageService.displayError('There was an error while attempting to publish this article', 4000);
    });
  }

  filterTags(text: string): Observable<string[]> {
    return this.editorService.getTags(text);
  }

  removeTag(tag: string) {
    this.selectedTags.delete(tag);
  }

  tagSelected(tag: string) {
    if (this.selectedTags.has(this.tagInput)) {
      this.snackbarMessageService.displayError('Tag already exists', 2000);
    } else {
      this.selectedTags.add(tag);
      this.snackbarMessageService.displayError(`Added the tag: ${tag}`, 2000);
      this.formGroup.get('tags').patchValue('');
    }
  }

  onEnter(event: any) {
    if (event.keyCode === 13) {
      if (this.selectedTags.has(this.tagInput)) {
        this.snackbarMessageService.displayError('Tag already exists', 2000);
      } else {
        const input = this.tagInput;
        this.editorService.addTag(input)
          .subscribe(result => {
            this.selectedTags.add(input);
            this.snackbarMessageService.displayError(`Added the tag: ${input}`, 2000);
            this.formGroup.get('tags').patchValue('');
          }, error => {
            this.snackbarMessageService.displayError('Error adding tag', 2000);
          });
      }
    }
  }

  fileChangeListener($event) {
    const image = new Image();
    const file = $event.target.files[0];
    const myReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      this.image = loadEvent.target.result;
    };

    myReader.readAsDataURL(file);
  }

  openPreview() {
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: this.image
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  previewImage(): boolean {
    return !!this.image;
  }
}
