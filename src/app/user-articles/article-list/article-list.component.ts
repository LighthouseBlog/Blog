import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort, MatPaginator } from '@angular/material';

import { AuthorService } from '../../_services/author.service';
import { Router } from '@angular/router';
import { ArticleDataSource } from './article-data/article.datasource';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Article } from '../../_models/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  dataSource: ArticleDataSource;
  dataSubject = new BehaviorSubject<Article[]>([]);
  displayedColumns: string[];
  isDataLoaded: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.displayedColumns = ['title', 'description', 'datePosted']
  }

  ngOnInit() {
    this.authorService.getArticlesByAuthor().subscribe((results) => {
      this.dataSubject.next(results);
    });
    this.dataSource = new ArticleDataSource(this.authorService, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}
