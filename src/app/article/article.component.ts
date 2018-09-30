import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ArticleService } from 'app/_services/article.service';
import { AuthorService } from 'app/_services/author.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

import { Article } from 'app/_models/Article';
import { Author } from 'app/_models/Author';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

    article: Article;
    author: Author;

    private destroyed: Subject<boolean> = new Subject<boolean>();

    constructor(private articleService: ArticleService,
                private route: ActivatedRoute,
                private authorService: AuthorService,
                private snackbarMessagingService: SnackbarMessagingService) { }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroyed))
            .subscribe(params => {
                this.getArticle(params);
            });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    getArticle(params: Params) {
        this.articleService.getArticle(params.id)
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                this.article = result;
                this.getAuthor();
            }, error => this.snackbarMessagingService.displayError(error));
    }

    getAuthor() {
        this.authorService.getAuthor(this.article.author.username)
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                this.author = result;
            }, error => this.snackbarMessagingService.displayError(error));
    }
}
