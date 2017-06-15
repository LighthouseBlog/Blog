import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../_services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public articles;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articles = this.articleService.getAllArticles();
  }

  selectedArticle(e) {
    console.log('Article', e);
  }

}
