import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from 'app/_models/Article';
import { ImageSet } from '../../_models/ImageSet';

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

    get image(): string {
        if (!!this.article && !!this.article.coverPhoto) {
            return this.article.coverPhoto.small;
        }
    }

    get imageSet(): ImageSet {
        if (!!this.article && !!this.article.coverPhoto) {
            return this.article.coverPhoto;
        }
    }
}
