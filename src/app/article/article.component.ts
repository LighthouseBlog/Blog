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

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    this.article = '';
  }

  ngOnInit() {
    this.route.params
      .subscribe(results => {
        this.articleService.getArticle(results.id)
          .subscribe(result => {
            this.article = result;
          })
      })
  }
}
