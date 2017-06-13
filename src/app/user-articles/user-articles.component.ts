import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css']
})
export class UserArticlesComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  createArticle() {
    const dialogRef = this.dialog.open(CreateArticleModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Result', result);
    });
  }

}
