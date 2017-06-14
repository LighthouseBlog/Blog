import { Component, OnInit, Input } from '@angular/core';

import { ArticleService } from '../_services/article.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  private opened = false;
  public articles;

  constructor(private articleService: ArticleService) {
    this.articles = [];
  }

  clicked(event) {
    this.opened = !this.opened;
  }

  ngOnInit() {
    this.retrieveArticles();
  }

  retrieveArticles() {
    this.articles = this.articleService.getAllArticles();
  }

  onClose() {
    this.opened = false;
  }
}
