import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { EditorService } from '../_services/editor.service';
import { ArticleService } from '../_services/article.service';
import { ImagesService } from '../_services/images.service';

import { environment } from '../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private options: Object = {
    heightMin: 400,
    placeholderText: 'Edit Content Here',
    charCounterCount: true,
    htmlRemoveTags: [],
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
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',
    'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle',
    'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
    'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile',
    'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll',
    'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', 'github'],
    pluginsEnabled: ['customPlugin']
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
    private snackBar: MdSnackBar
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

  initializeGistButton() {
      // Define popup template.
    $.extend($.FroalaEditor.POPUP_TEMPLATES, {
      'customPlugin.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
    });

    // Define popup buttons.
    $.extend($.FroalaEditor.DEFAULTS, {
      popupButtons: ['popupClose', '|', 'popupButton1', 'popupButton2'],
    });

    // The custom popup is defined inside a plugin (new or existing).
    $.FroalaEditor.PLUGINS.customPlugin = function (editor) {
      // Create custom popup.
      function initPopup () {
        // Popup buttons.
        let popup_buttons = '';

        // Create the list of buttons.
        if (editor.opts.popupButtons.length > 1) {
          popup_buttons += '<div class="fr-buttons">';
          popup_buttons += editor.button.buildList(editor.opts.popupButtons);
          popup_buttons += '</div>';
        }

        // Load popup template.
        const template = {
          buttons: popup_buttons,
          custom_layer: `
          <div>
              <input mdInput placeholder="Url" value="">
          </div>`
        };

        // Create popup.
        const $popup = editor.popups.create('customPlugin.popup', template);

        return $popup;
      }

      // Show the popup
      function showPopup () {
        // Get the popup object defined above.
        let $popup = editor.popups.get('customPlugin.popup');

        // If popup doesn't exist then create it.
        // To improve performance it is best to create the popup when it is first needed
        // and not when the editor is initialized.
        if (!$popup) {
          $popup = initPopup()
        }

        // Set the editor toolbar as the popup's container.
        editor.popups.setContainer('customPlugin.popup', editor.$tb);

        // This will trigger the refresh event assigned to the popup.
        // editor.popups.refresh('customPlugin.popup');

        // This custom popup is opened by pressing a button from the editor's toolbar.
        // Get the button's object in order to place the popup relative to it.
        const $btn = editor.$tb.find('.fr-command[data-cmd="github"]');

        // Set the popup's position.
        const left = $btn.offset().left + $btn.outerWidth() / 2;
        const top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

        // Show the custom popup.
        // The button's outerHeight is required in case the popup needs to be displayed above it.
        editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
      }

      // Hide the custom popup.
      function hidePopup () {
        editor.popups.hide('customPlugin.popup');
      }

      // Methods visible outside the plugin.
      return {
        showPopup: showPopup,
        hidePopup: hidePopup
      }
    }

    // Define an icon and command for the button that opens the custom popup.
    $.FroalaEditor.DefineIcon('github', { NAME: 'github'})
    $.FroalaEditor.RegisterCommand('github', {
      title: 'Convert Url to GISTlike code',
      icon: 'github',
      undo: false,
      focus: false,
      plugin: 'customPlugin',
      callback: function () {
        this.customPlugin.showPopup();
      }
    });

    // Define custom popup close button icon and command.
    $.FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
    $.FroalaEditor.RegisterCommand('popupClose', {
      title: 'Close',
      undo: false,
      focus: false,
      callback: function () {
        this.customPlugin.hidePopup();
      }
    });

    // Define custom popup 1.
    $.FroalaEditor.DefineIcon('popupButton1', { NAME: 'bell-o' });
    $.FroalaEditor.RegisterCommand('popupButton1', {
      title: 'Button 1',
      undo: false,
      focus: false,
      callback: function () {
        alert('popupButton1 was pressed');
      }
    });

    // Define custom popup 2.
    $.FroalaEditor.DefineIcon('popupButton2', { NAME: 'bullhorn' });
    $.FroalaEditor.RegisterCommand('popupButton2', {
      title: 'Button 2',
      undo: false,
      focus: false,
      callback: function () {
        alert('popupButton2');
      }
    });
  }

  ngOnInit() {
    this.initializeGistButton();
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
