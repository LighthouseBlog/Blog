import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

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
    public dialog: MdDialog,
    private authorService: AuthorService,
    private router: Router) {
    this.settings = {
      delete: {
        confirmDelete: true,
      },
      actions: {
        add: false,
        columnTitle: 'Your Articles'
      },
      edit: {
        confirmSave: true,
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
    const dialogRef = this.dialog.open(CreateArticleModalComponent, {
      height: '50vh',
      width: '50vw',
    });
  }

  onCreate(e) {
    console.log('Created', e);
  }

  onEdit(e) {
    const id = e.data._id;
    this.router.navigateByUrl('/edit/' + id);
  }

  onDelete(e) {
    console.log('Deleted', e);
  }

}
