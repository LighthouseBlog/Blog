import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

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
    private currentPage = 1;
    private pageSize = 4;
    private currentTag: string;

    articles: Article[] = [];
    articlesLoading = true;
    moreArticlesExist = false;

    constructor(private articleService: ArticleService,
                private tagService: TagService,
                private sms: SnackbarMessagingService) { }

    ngOnInit() {
        this.getArticles();
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    filterByTag(tag: string) {
        this.currentTag = tag;
        this.currentPage = 1;
        this.articles = [];
        this.getArticlesByTag();
    }

    loadMoreArticles() {
        this.currentPage++;
        if (!!this.currentTag) {
            this.getArticlesByTag();
        } else {
            this.getArticles();
        }
    }

    clearTagSelection() {
        this.currentPage = 1;
        this.currentTag = '';
        this.getArticles();
    }

    private getArticles() {
        this.articlesLoading = true;
        this.articleService.getAllArticles(this.currentPage, this.pageSize)
            .pipe(
                takeUntil(this.destroyed),
                finalize(() => this.articlesLoading = false)
            )
            .subscribe(articles => {
                this.moreArticlesExist = articles.length >= this.pageSize;
                this.articles.push(...articles);
            }, error => this.sms.displayError(error));
    }

    private getArticlesByTag() {
        this.articlesLoading = true;
        this.tagService.getArticlesByTag(this.currentTag, this.currentPage, this.pageSize)
            .pipe(
                takeUntil(this.destroyed),
                finalize(() => this.articlesLoading = false)
            )
            .subscribe(articles => {
                this.moreArticlesExist = articles.length >= this.pageSize;
                this.articles.push(...articles);
            }, error => this.sms.displayError(error));
    }
}
