import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../_services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public article;
  public articleText;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    this.article = {name: 'Article name'};
    this.articleText = '<p> Insert Test </p>';
  }

  ngOnInit() {
    this.route.params
      .subscribe(results => {
        this.article = this.articleService.getArticle(results.id)
      })
  }
}
