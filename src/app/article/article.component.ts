import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from 'app/_services/article.service';
import { AuthorService } from 'app/_services/author.service';

import { Article } from 'app/_models/Article';
import { Author } from 'app/_models/Author';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

    public article: Article;
    public author: Author;

    private destroyed: Subject<boolean> = new Subject<boolean>();

    constructor(private articleService: ArticleService,
                private route: ActivatedRoute,
                private authorService: AuthorService) { }

    ngOnInit() {
        this.route.params
            .takeUntil(this.destroyed)
            .subscribe(results => {
                this.getArticle(results);
            });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    getArticle(results) {
        this.articleService.getArticle(results.id)
            .takeUntil(this.destroyed)
            .subscribe(result => {
                this.article = result;
                this.getAuthor();
            });
    }

    getAuthor() {
        this.authorService.getAuthor(this.article.author.username)
            .takeUntil(this.destroyed)
            .subscribe(result => {
                this.author = result;
            });
    }
}
