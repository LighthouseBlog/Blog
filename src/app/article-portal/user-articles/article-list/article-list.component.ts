import { Component, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog, MatSort, MatPaginator } from '@angular/material';
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
export class ArticleListComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    dataSource: ArticleDataSource;
    dataSubject = new BehaviorSubject<Article[]>([]);
    displayedColumns: string[];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;

    constructor(private dialog: MatDialog,
                private authorService: AuthorService,
                private router: Router,
                private sms: SnackbarMessagingService) {
        this.displayedColumns = ['isPublished', 'title', 'description', 'datePosted', 'actions']
    }

    ngOnInit() {
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

    viewArticle(article: Article) {
        this.router.navigateByUrl('/article/' + article.id);
    }

    editArticle(article: Article) {
        this.router.navigateByUrl('/edit/' + article.id);
    }

    deleteArticle(article: Article, articles: Article[]) {
        this.dialog.open(DeleteArticleModalComponent)
            .afterClosed()
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                if (result === 'delete') {
                    this.dataSubject.next(articles.filter(a => a !== article));
                    this.sms.displaySuccess('Deleted article', 2000);
                }
            }, error => this.sms.displayError(error));
    }
}
