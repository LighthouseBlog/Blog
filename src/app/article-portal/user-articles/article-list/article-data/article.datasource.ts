import { DataSource } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Article } from 'app/_models/Article';

export class ArticleDataSource extends DataSource<Article> {

    private _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor(private dataSubject: BehaviorSubject<Article[]>,
                private sort: MatSort,
                private paginator: MatPaginator) {
        super();
    }

    connect(): Observable<Article[]> {
        const displayDataChanges = [
            this.dataSubject,
            this.paginator.page,
            this._filterChange,
            this.sort.sortChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const articleData = this.dataSubject.value.slice()

            const filteredData = this.filterData(articleData);
            const sortedData = this.sortData(filteredData);
            const paginatedData = this.paginateData(sortedData);

            return paginatedData;
        });
    }

    disconnect() {
        this._filterChange.complete();
    }

    filterData(articles: Article[]): Article[] {
        return articles.filter((article: Article) => {
            const searchStr = (article.title).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
    }

    paginateData(articles: Article[]): Article[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return articles.splice(startIndex, this.paginator.pageSize);
    }

    sortData(articles: Article[]): Article[] {
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
