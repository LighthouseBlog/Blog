import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { ArticleService } from 'app/_services/article.service';
import { Article } from '../_models/Article';
import { TagService } from '../_services/tags.service';

@Component({
    selector: 'articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public articles: Article[];

    constructor(private articleService: ArticleService,
                private tagService: TagService) { }

    ngOnInit() {
        this.articleService.getAllArticles()
            .takeUntil(this.destroyed)
            .subscribe((articles) => this.articles = articles)
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    getArticlesByTag(tag: string) {
        this.tagService.getArticlesByTag(tag)
            .takeUntil(this.destroyed)
            .subscribe((articles) => this.articles = articles);
    }
}
