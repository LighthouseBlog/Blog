import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit {

  public settings;

  constructor(public dialog: MdDialog) {
    this.settings = {
      columns: {
        name: {
          title: 'Title'
        },
        author: {
          title: 'Author'
        },
        createdOn: {
          title: 'Created On'
        }
      }
    };
  }

  ngOnInit() {
  }

  createArticle() {
    const dialogRef = this.dialog.open(CreateArticleModalComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

}
