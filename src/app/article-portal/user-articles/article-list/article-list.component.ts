import { Component, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';

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

    public dataSource: ArticleDataSource;
    public dataSubject = new BehaviorSubject<Article[]>([]);
    public displayedColumns: string[];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;

    constructor(public dialog: MatDialog,
                private authorService: AuthorService,
                private router: Router,
                private snackbarMessagingService: SnackbarMessagingService) {
        this.displayedColumns = ['isPublished', 'title', 'description', 'datePosted', 'actions']
    }

    ngOnInit() {
        this.authorService.getArticlesByAuthor()
            .takeUntil(this.destroyed)
            .subscribe((results) => {
                this.dataSubject.next(results);
            });
        this.dataSource = new ArticleDataSource(this.dataSubject, this.sort, this.paginator);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    viewArticle(article: Article) {
        this.router.navigateByUrl('/article/' + article._id);
    }

    editArticle(article: Article) {
        const id = article._id;
        this.router.navigateByUrl('/edit/' + id);
    }

    deleteArticle(article: Article, articles: Article[]) {
        this.dialog.open(DeleteArticleModalComponent)
            .afterClosed()
            .takeUntil(this.destroyed)
            .subscribe((result) => {
                if (result === 'delete') {
                    this.dataSubject.next(articles.filter(a => a !== article));
                    this.snackbarMessagingService.displaySuccess('Deleted article', 2000);
                }
            });
    }
}
