import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from 'app/_services/article.service';
import { AuthorService } from 'app/_services/author.service';

import { Article } from 'app/_models/Article';
import { Author } from 'app/_models/Author';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public author: Author;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authorService: AuthorService,
  ) {
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
    this.authorService.getAuthor(this.article.author.username)
      .subscribe(result => {
        this.author = result;
      });
  }
}
