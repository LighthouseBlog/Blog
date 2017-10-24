import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { Article } from '../../../_models/Article';
import { AuthorService } from '../../../_services/author.service';

export class ArticleDataSource extends DataSource<any> {
  private articleData: Article[]

  constructor(private authorService: AuthorService, private sort: MatSort) {
    super();
  }

  connect(): Observable<Article[]> {
    const displayDataChanges = [
      this.authorService.getArticlesByAuthor(),
      this.sort.sortChange.asObservable(),
    ];

    return Observable.merge(...displayDataChanges).map((data) => {
      this.articleData = data;
      return this.getSortedData();
    });
  }

  disconnect() {}

  getSortedData(): Article[] {
    const data = this.articleData.slice();
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
