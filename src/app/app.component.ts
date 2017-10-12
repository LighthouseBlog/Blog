import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, RoutesRecognized } from '@angular/router';

import { ArticleService } from './_services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public opened = false;
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

  clicked(event) {
    this.opened = !this.opened;
  }

  ngOnInit() {
    this.retrieveArticles();
    this.articleCtrl.valueChanges
      .subscribe(results => {
        this.selectedArticle = results;
        console.log('Selected Article', this.selectedArticle);
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

  onClose() {
    this.opened = false;
  }

  filterArticles(val: string) {
    return val ? this.articles.filter(a => new RegExp(`^${val}`, 'gi').test(a.name))
               : this.articles;
  }
}

