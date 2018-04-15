import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

import { AuthorService } from 'app/_services/author.service';

@Component({
    selector: 'user-articles',
    templateUrl: './user-articles.component.html',
    styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent {

    constructor(public dialog: MatDialog) { }

    createArticle() {
        this.dialog.open(CreateArticleModalComponent);
    }
}
