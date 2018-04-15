import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort } from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

import { AuthorService } from 'app/_services/author.service';
import { Article } from 'app/_models/Article';
import { ArticleListComponent } from './article-list/article-list.component';

@Component({
    selector: 'user-articles',
    templateUrl: './user-articles.component.html',
    styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent {

    constructor(public dialog: MatDialog,
                private authorService: AuthorService) { }

    createArticle() {
        this.dialog.open(CreateArticleModalComponent);
    }
}
