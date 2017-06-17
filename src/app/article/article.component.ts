import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../_services/article.service';
import { AuthorService } from '../_services/author.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public article;
  public author;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authorService: AuthorService,
  ) {
    this.article = {};
    this.author = {};
  }

  ngOnInit() {
    this.route.params
      .subscribe(results => {
        this.getArticle(results);
      });
  }

  getArticle(results) {
    this.articleService.getArticle(results.id)
      .subscribe(result => {
        this.article = result;
        this.getAuthor();
      });
  }

  getAuthor() {
    this.authorService.getAuthor(this.article.author)
      .subscribe(result => {
        this.author = result;
      });
  }
}
