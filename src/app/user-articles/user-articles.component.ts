import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort } from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';
import { DeleteArticleModalComponent } from '../delete-article-modal/delete-article-modal.component';

import { AuthorService } from '../_services/author.service';
import { Router } from '@angular/router';
import { Article } from '../_models/Article';
import { ArticleListComponent } from './article-list/article-list.component';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  createArticle() {
    this.dialog.open(CreateArticleModalComponent, {
      height: '50vh',
      width: '50vw'
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
      width: '40vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.source.remove(e.data);
    });
  }
}
