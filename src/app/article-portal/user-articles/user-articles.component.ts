import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

@Component({
    selector: 'user-articles',
    templateUrl: './user-articles.component.html',
    styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent {

    constructor(private dialog: MatDialog) { }

    createArticle() {
        this.dialog.open(CreateArticleModalComponent);
    }
}
