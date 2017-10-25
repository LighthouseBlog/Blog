import { DataSource } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Article } from '../../../_models/Article';
import { AuthorService } from '../../../_services/author.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ArticleDataSource extends DataSource<Article> {
  public articleData: Article[];

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Article[];

  constructor(private authorService: AuthorService, private sort: MatSort, private paginator: MatPaginator) {
    super();
    this.articleData = [];
  }

  connect(): Observable<Article[]> {
    const displayDataChanges = [
      this.authorService.getArticlesByAuthor(),
      this._filterChange,
      this.paginator.page
    ];

    return Observable.concat(...displayDataChanges).map((data, index) => {
      console.log('Data', data);
      if (index === 0) {
        this.articleData = data;
      }
      const filteredData = this.articleData.slice().filter((article: Article) => {
        const searchStr = (article.title).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return filteredData.splice(startIndex, this.paginator.pageSize);
    });
  }

  get articleDataLength(): Number {
    return this.articleData.length;
  }

  disconnect() {}

  getSortedData(articles: Article[]): Article[] {
    const data = articles.slice();
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | Date = '';
      let propertyB: number | string | Date = '';

      switch (this.sort.active) {
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
        (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
