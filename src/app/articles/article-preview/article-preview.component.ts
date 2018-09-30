import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from 'app/_models/Article';

@Component({
    selector: 'article-preview',
    templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
    @Input() article: Article;

    constructor(private router: Router) { }

    selectArticle() {
        const articleToPreview = Object.assign(new Article(), this.article);
        this.router.navigate(['article', articleToPreview.id]);
    }
}
