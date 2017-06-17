import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../_services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articles = this.articleService.getAllArticles();
  }

  selectedArticle(e) {
    this.articleService.setArticleId(e._id);
    this.router.navigate(['article', e._id]);
  }

}
