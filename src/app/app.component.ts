import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, RoutesRecognized } from '@angular/router';

import { ArticleService } from 'app/_services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public articles;
  public mainArticles;
  public filteredArticles;
  public articleCtrl: FormControl;
  private selectedArticle;
  public showArticles = true;

  constructor(
    private articleService: ArticleService,
    private router: Router) {
    this.articles = [];
    this.articleCtrl = new FormControl();
    this.router.events
      .subscribe((event: RoutesRecognized) => {
        if (event.url !== '/') {
          this.showArticles = false;
        } else {
          this.showArticles = true;
        }
    })
  }

  ngOnInit() {
    this.retrieveArticles();
    this.articleCtrl.valueChanges
      .subscribe(results => {
        this.selectedArticle = results;
      })
  }

  retrieveArticles() {
    this.articleService.getAllArticles()
      .subscribe(results => {
        this.articles = results;
        this.filteredArticles = this.articleCtrl.valueChanges
          .map(name => this.filterArticles(name));
      })
  }

  filterArticles(val: string) {
    return val ? this.articles.filter(a => new RegExp(`^${val}`, 'gi').test(a.name))
               : this.articles;
  }
}

