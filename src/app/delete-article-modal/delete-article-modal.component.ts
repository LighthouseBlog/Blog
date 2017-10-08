import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { EditorService } from '../_services/editor.service';
import { Article } from '../_models/Article';

@Component({
  selector: 'app-delete-article-modal',
  templateUrl: './delete-article-modal.component.html',
  styleUrls: ['./delete-article-modal.component.scss']
})
export class DeleteArticleModalComponent implements OnInit {

  public article: Article;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: Article,
    private editorService: EditorService,
    private dialogRef: MdDialogRef<DeleteArticleModalComponent>) {
    this.article = data;
  }

  ngOnInit() {
  }

  deleteArticle() {
    this.editorService.deleteArticle(this.data)
      .subscribe(result => {
        if (result) {
          this.dialogRef.close('closed');
        }
      })
  }

}
