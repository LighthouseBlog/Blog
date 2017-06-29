import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { EditorService } from '../_services/editor.service';

@Component({
  selector: 'app-delete-article-modal',
  templateUrl: './delete-article-modal.component.html',
  styleUrls: ['./delete-article-modal.component.scss']
})
export class DeleteArticleModalComponent implements OnInit {

  public article: Object;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: Object,
    private editorService: EditorService,
    private dialogRef: MdDialogRef<DeleteArticleModalComponent>) {
    console.log('Data', data);
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
