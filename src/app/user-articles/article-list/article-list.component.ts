import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort } from '@angular/material';

import { LocalDataSource } from 'ng2-smart-table';

import { AuthorService } from '../../_services/author.service';
import { Router } from '@angular/router';
import { ArticleDataSource } from './article-data/article.datasource';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements AfterViewInit {
  source: LocalDataSource;
  dataSource: ArticleDataSource;
  displayedColumns: string[];
  isDataLoaded: boolean;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.displayedColumns = ['title', 'description', 'datePosted']
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource = new ArticleDataSource(this.authorService, this.sort);
    })
  }
}
