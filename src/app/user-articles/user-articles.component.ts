import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';
import { DeleteArticleModalComponent } from '../delete-article-modal/delete-article-modal.component';

import { LocalDataSource } from 'ng2-smart-table'
import { AuthorService } from '../_services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit {

  public settings;
  public data;
  source: LocalDataSource;

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private router: Router) {
    this.settings = {
      actions: {
        add: false,
        columnTitle: 'Your Articles'
      },
      columns: {
        _id: {
          title: 'ID',
          editable: false
        },
        title: {
          title: 'Title',
          editable: false
        },
        description: {
          title: 'Description',
          editor: {
            type: 'textarea',
          },
          editable: false
        },
        author: {
          title: 'Author',
          editable: false
        },
        datePosted: {
          title: 'Date Posted',
          editable: false
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
          return {
            _id: result._id,
            author: result.author,
            title: result.title,
            description: result.description,
            datePosted: new Date(result.datePosted).toDateString()
          }
        }));
      });
  }

  createArticle() {
    this.dialog.open(CreateArticleModalComponent, {
      height: '50vh',
      width: '50vw',
    });
  }

  onEdit(e) {
    const id = e.data._id;
    this.router.navigateByUrl('/edit/' + id);
  }

  onDelete(e) {
    console.log('e', e);
    const dialogRef = this.dialog.open(DeleteArticleModalComponent, {
      data: e.data,
      height: '40vh',
      width: '40vw',
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.source.remove(e.data)
      })
  }

}
