import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ArticleService } from 'app/_services/article.service';
import { AuthorService } from 'app/_services/author.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

import { Article } from 'app/_models/Article';
import { Author } from 'app/_models/Author';
import { ImageSet } from '../_models/ImageSet';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

    article: Article;
    author: Author;
    articleCoverPhoto = '';
    coverPhotoSet: ImageSet;
    authorProfilePicture = '';
    profilePictureSet: ImageSet;

    private destroyed: Subject<boolean> = new Subject<boolean>();

    constructor(private articleService: ArticleService,
                private route: ActivatedRoute,
                private authorService: AuthorService,
                private snackbarMessagingService: SnackbarMessagingService,
                private location: Location) { }

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
                this.articleCoverPhoto = !!this.article.coverPhoto ? this.article.coverPhoto.small : '';
                this.coverPhotoSet = !!this.article.coverPhoto ? this.article.coverPhoto : null;
                this.getAuthor();
            }, error => this.snackbarMessagingService.displayError(error));
    }

    getAuthor() {
        this.authorService.getAuthor(this.article.author.username)
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                this.author = result;
                this.authorProfilePicture = !!this.author.profilePicture ? this.author.profilePicture.small : '';
                this.profilePictureSet = !!this.author.profilePicture ? this.author.profilePicture : null;
            }, error => this.snackbarMessagingService.displayError(error));
    }

    onBackClicked() {
        this.location.back();
    }
}
