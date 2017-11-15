import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { EditorService } from 'app/_services/editor.service';
import { Article } from 'app/_models/Article';

@Component({
  selector: 'app-delete-article-modal',
  templateUrl: './delete-article-modal.component.html',
  styleUrls: ['./delete-article-modal.component.scss']
})
export class DeleteArticleModalComponent {

  public article: Article;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Article,
    private editorService: EditorService,
    private dialogRef: MatDialogRef<DeleteArticleModalComponent>) {
    this.article = data;
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
