import { Component, ViewChild, OnInit, ElementRef, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MatDialog, MatSort, MatPaginator } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AuthorService } from 'app/_services/author.service';
import { ArticleDataSource } from './article-data/article.datasource';
import { Article } from 'app/_models/Article';
import { DeleteArticleModalComponent } from 'app/article-portal/delete-article-modal/delete-article-modal.component';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

@Component({
    selector: 'article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy, OnChanges {

    private destroyed: Subject<boolean> = new Subject<boolean>();
    private _mobileQueryListener: () => void;

    dataSource: ArticleDataSource;
    dataSubject = new BehaviorSubject<Article[]>([]);
    displayedColumns: string[];
    mobileQuery: MediaQueryList;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;

    constructor(private dialog: MatDialog,
                private authorService: AuthorService,
                private router: Router,
                private sms: SnackbarMessagingService,
                private media: MediaMatcher,
                private cdr: ChangeDetectorRef) {
        this.mobileQuery = this.media.matchMedia('(max-width: 599px)');
        this._mobileQueryListener = () => this.cdr.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.setColumns();
        this.authorService.getArticlesByAuthor()
            .pipe(takeUntil(this.destroyed))
            .subscribe(results => {
                this.dataSubject.next(results);
            }, error => this.sms.displayError(error));
        this.dataSource = new ArticleDataSource(this.dataSubject, this.sort, this.paginator);
        fromEvent(this.filter.nativeElement, 'keyup').pipe(
            debounceTime(150),
            distinctUntilChanged())
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            }, error => this.sms.displayError(error));
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    ngOnChanges() {
        this.setColumns();
    }

    viewArticle(article: Article) {
        const articleToView = Object.assign(new Article(), article);
        this.router.navigateByUrl('/article/' + articleToView.id);
    }

    editArticle(article: Article) {
        const articleToEdit = Object.assign(new Article(), article);
        this.router.navigateByUrl('/edit/' + articleToEdit.id);
    }

    deleteArticle(article: Article, articles: Article[]) {
        const articleToDelete = Object.assign(new Article(), article);
        this.dialog.open(DeleteArticleModalComponent, {
            data: {
                id: articleToDelete.id
            }
        })
        .afterClosed()
        .pipe(takeUntil(this.destroyed))
        .subscribe(result => {
            if (result === 'delete') {
                this.dataSubject.next(articles.filter(a => a !== article));
                this.sms.displaySuccess('Deleted article', 2000);
            }
        }, error => this.sms.displayError(error));
    }

    private setColumns() {
        if (this.mobileQuery.matches) {
            this.displayedColumns = ['isPublished', 'title', 'actions'];
        } else {
            this.displayedColumns = ['isPublished', 'title', 'description', 'datePosted', 'actions'];
        }
    }
}
