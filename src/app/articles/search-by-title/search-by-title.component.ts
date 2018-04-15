import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ArticleList } from '../../_models/ArticleList';
import { ArticleService } from '../../_services/article.service';

@Component({
    selector: 'search-by-title',
    templateUrl: './search-by-title.component.html',
    styleUrls: ['./search-by-title.component.scss']
})
export class SearchByTitleComponent implements OnDestroy {
    public filteredArticles: Observable<ArticleList[]>;

    private destroyed: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router,
                private articleService: ArticleService) { }

    selectArticle(article: ArticleList) {
        this.router.navigate(['article', article._id]);
    }

    filterArticles(title: string) {
        this.filteredArticles = this.articleService.getArticlesByTitle(title).takeUntil(this.destroyed);
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
