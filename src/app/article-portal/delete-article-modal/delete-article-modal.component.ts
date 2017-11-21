import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { EditorService } from 'app/_services/editor.service';
import { Article } from 'app/_models/Article';

@Component({
  selector: 'app-delete-article-modal',
  templateUrl: './delete-article-modal.component.html',
  styleUrls: ['./delete-article-modal.component.scss']
})
export class DeleteArticleModalComponent implements OnDestroy {

  private destroyed: Subject<boolean> = new Subject<boolean>();
  
  public article: Article;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Article,
    private editorService: EditorService,
    private dialogRef: MatDialogRef<DeleteArticleModalComponent>) {
    this.article = data;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  deleteArticle() {
    this.editorService.deleteArticle(this.data)
      .takeUntil(this.destroyed)
      .subscribe(result => {
        if (result) {
          this.dialogRef.close('closed');
        }
      })
  }

}
