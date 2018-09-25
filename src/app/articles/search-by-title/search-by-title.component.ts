import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ArticleList } from 'app/_models/ArticleList';
import { ArticleService } from 'app/_services/article.service';

@Component({
    selector: 'search-by-title',
    templateUrl: './search-by-title.component.html',
    styleUrls: ['./search-by-title.component.scss']
})
export class SearchByTitleComponent implements OnDestroy {
    filteredArticles: Observable<ArticleList[]>;

    private destroyed: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router,
                private articleService: ArticleService) { }

    selectArticle(article: ArticleList) {
        this.router.navigate(['article', article.id]);
    }

    filterArticles(title: string) {
        if (title) {
            this.filteredArticles = this.articleService.getArticlesByTitle(title).pipe(takeUntil(this.destroyed));
        }
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
