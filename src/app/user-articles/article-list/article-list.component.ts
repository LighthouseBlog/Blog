import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort } from '@angular/material';

import { LocalDataSource } from 'ng2-smart-table';
import { DataSource } from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { AuthorService } from '../../_services/author.service';
import { Router } from '@angular/router';
import { Article } from '../../_models/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  source: LocalDataSource;
  dataSource: ArticleDataSource;
  displayedColumns: string[];
  dataChange: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.displayedColumns = ['title', 'description', 'datePosted'];
    this.dataSource = new ArticleDataSource(this.authorService, this.sort);
  }
}

export class ArticleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  constructor(private authorService: AuthorService, private _sort: MatSort) {
    super();
  }

  connect(): Observable<Article[]> {
    const displayDataChanges = [
      this.authorService.dataChange,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  getSortedData(): Article[] {
    const data = this.authorService.articleData.slice();
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'description':
          [propertyA, propertyB] = [a.description, b.description];
          break;
        case 'datePosted':
          [propertyA, propertyB] = [a.datePosted, b.datePosted];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
