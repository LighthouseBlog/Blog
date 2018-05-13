import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ArticleService } from 'app/_services/article.service';
import { TagService } from 'app/_services/tags.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

import { Article } from 'app/_models/Article';

@Component({
    selector: 'articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public articles: Article[];

    constructor(private articleService: ArticleService,
                private tagService: TagService,
                private sms: SnackbarMessagingService) { }

    ngOnInit() {
        this.articleService.getAllArticles()
            .pipe(takeUntil(this.destroyed))
            .subscribe(articles => this.articles = articles, error => this.sms.displayError(error));
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    getArticlesByTag(tag: string) {
        this.tagService.getArticlesByTag(tag)
            .pipe(takeUntil(this.destroyed))
            .subscribe(articles => this.articles = articles, error => this.sms.displayError(error));
    }
}
