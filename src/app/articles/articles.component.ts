import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { ArticleService } from 'app/_services/article.service';
import { Article } from '../_models/Article';

@Component({
    selector: 'articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public articles: Observable<Article[]>;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        this.articles = this.articleService.getAllArticles().takeUntil(this.destroyed);
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
