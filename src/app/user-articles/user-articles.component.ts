import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

import { LocalDataSource } from 'ng2-smart-table'
import { AuthorService } from '../_services/author.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit {

  public settings;
  public data;
  source: LocalDataSource;

  constructor(public dialog: MdDialog, private authorService: AuthorService) {
    this.settings = {
      columns: {
        title: {
          name: 'Title'
        },
        description: {
          name: 'Description'
        },
        author: {
          name: 'Author'
        },
        datePosted: {
          name: 'Date Posted'
        }
      },
      mode: 'external'
    };

    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.authorService.getArticlesByAuthor()
      .subscribe(results => {
        this.source.load(results.map((result) => {
          result['author'] = this.authorService.getAuthorUsername();
        }));
      });
  }

  createArticle() {
    const dialogRef = this.dialog.open(CreateArticleModalComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

  onCreate(e) {
    console.log('Created', e);
  }

}
