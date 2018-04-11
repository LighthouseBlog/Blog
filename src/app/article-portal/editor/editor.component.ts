import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/finally';

import { EditorService } from 'app/_services/editor.service';
import { ArticleService } from 'app/_services/article.service';
import { ImagesService } from 'app/_services/images.service';

import initializeFroalaGistPlugin from 'app/_plugins/gist.plugin'

import { environment } from 'environments/environment';
import { FileValidator } from 'app/_directives/fileValidator.directive';
import { ImagePreviewComponent } from 'app/article-portal/image-preview/image-preview.component';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

    private tb = ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',
        'subscript', 'superscript', '|', 'inlineStyle',
        'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
        'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile',
        'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll',
        'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', 'github']
    private options: Object = {
        placeholderText: 'Edit Content Here',
        charCounterCount: true,
        htmlAllowedTags: ['.*'],
        htmlAllowedAttrs: ['.*'],
        htmlRemoveTags: [''],
        htmlAllowedStyleProps: ['.*'],
        htmlDoNotWrapTags: [''],
        htmlUntouched: true,
        pasteAllowedStyleProps: ['.*'],
        lineBreakerTags: [''],
        tableStyles: {},
        linkAlwaysBlank: true,
        toolbarSticky: false,
        events: {
            'froalaEditor.contentChanged': (e, editor) => {
                this.updateContent(editor);
            },
            'froalaEditor.image.removed': (e, editor, $img) => {
                const src = $img.attr('src');
                this.imagesService.deleteImage(src)
                    .subscribe(result => { })
            }
        },
        toolbarButtons: this.tb,
        toolbarButtonsMD: this.tb,
        toolbarButtonsSM: this.tb,
        toolbarButtonsXS: this.tb,
    };
    private content: string;
    private destroyed: Subject<boolean> = new Subject<boolean>();


    public editorContent: string;
    public editing = false;
    public formGroup: FormGroup;
    public initControls: any;
    public filteredTags: Observable<string[]>;
    public selectedTags: Set<string>;
    public tagInput: string;
    public removable = true;
    public image: any;
    public savingArticle: boolean;

    constructor(private editorService: EditorService,
                private articleService: ArticleService,
                private imagesService: ImagesService,
                private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private snackbarMessageService: SnackbarMessagingService,
                public dialog: MatDialog) {
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
            .takeUntil(this.destroyed)
            .subscribe((input) => {
                this.filteredTags = this.filterTags(input);
            });

        initializeFroalaGistPlugin(this.editorService);
        this.editing = true;
        this.route.params.subscribe(params => {
            const id = params['id'];

            this.editorService.setArticleId(params['id']);

            this.articleService.getArticle(id)
                .takeUntil(this.destroyed)
                .subscribe(article => {
                    this.formGroup.patchValue({
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

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
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
            this.savingArticle = true;
            if (coverPhoto) {
                const formData = new FormData();
                const file = this.getCoverPhoto(coverPhoto);
                formData.append('coverPhoto', file);

                this.editorService.saveArticle(this.content, articleTitle, articleDescription, tags, formData)
                    .takeUntil(this.destroyed)
                    .finally(() => this.savingArticle = false)
                    .subscribe(result => {
                        this.snackbarMessageService.displaySuccess('Successfully saved article', 4000);
                    }, error => {
                        this.snackbarMessageService.displayError(error, 4000);
                    });
            } else {
                this.editorService.saveArticle(this.content, articleTitle, articleDescription, tags)
                    .takeUntil(this.destroyed)
                    .finally(() => this.savingArticle = false)
                    .subscribe(result => {
                        this.snackbarMessageService.displaySuccess('Successfully saved article', 4000);
                    }, error => {
                        this.snackbarMessageService.displayError(error, 4000);
                    });
            }
        }
    }

    getCoverPhoto(coverPhoto: any) {
        if (coverPhoto.target) {
            return coverPhoto.target.files[0];
        }
        return coverPhoto;
    }

    publishArticle() {
        this.editorService.publishArticle()
            .takeUntil(this.destroyed)
            .subscribe(result => {
                this.snackbarMessageService.displaySuccess('Successfully published article', 4000);
            }, error => {
                this.snackbarMessageService.displayError(error, 4000);
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
            this.snackbarMessageService.displayErrorMessage('Tag already exists', 2000);
        } else {
            this.selectedTags.add(tag);
            this.snackbarMessageService.displaySuccess(`Added the tag: ${tag}`, 2000);
            this.formGroup.get('tags').patchValue('');
        }
    }

    onEnter(event: any) {
        if (event.keyCode === 13 && this.tagInput) {
            if (this.selectedTags.has(this.tagInput)) {
                this.snackbarMessageService.displayErrorMessage('Tag already exists', 2000);
            } else {
                const input = this.tagInput;
                this.editorService.addTag(input)
                    .takeUntil(this.destroyed)
                    .subscribe(result => {
                        this.selectedTags.add(input);
                        this.snackbarMessageService.displaySuccess(`Added the tag: ${input}`, 2000);
                        this.formGroup.get('tags').patchValue('');
                    }, error => {
                        this.snackbarMessageService.displayError(error, 2000);
                    });
            }
        }
    }

    fileChangeListener($event) {
        const file = $event.target.files[0];
        const myReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => {
            this.image = loadEvent.target.result;
        };

        myReader.readAsDataURL(file);
    }

    openPreview() {
        const dialogRef = this.dialog.open(ImagePreviewComponent, {
            maxWidth: '800px',
            maxHeight: '400px',
            data: {
                src: this.image,
                aspectRatio: 16 / 9
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    this.formGroup.patchValue({
                        coverPhoto: result
                    });
                }
            });
    }

    previewImage(): boolean {
        return !!this.image;
    }
}
