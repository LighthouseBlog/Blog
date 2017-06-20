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
  public data;

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
      },
      mode: 'external'
    };
    this.data = [
      {
        name: 'How To Guide',
        author: 'Sam Pastoriza',
        createdOn: '11/11/1111'
      },
      {
        name: 'Testing',
        author: 'Sam Pastoriza',
        createdOn: '11/11/1311'
      },
      {
        name: 'Web Applications',
        author: 'Sam Pastoriza',
        createdOn: '11/11/1111'
      }
    ];
  }

  ngOnInit() {
  }

  createArticle() {
    const dialogRef = this.dialog.open(CreateArticleModalComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

  onCreate(e) {
    console.log('Created', e);
  }

}
