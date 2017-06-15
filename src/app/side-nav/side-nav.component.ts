import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ArticleService } from '../_services/article.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  private opened = false;
  public articles;
  public mainArticles;
  public filteredArticles;
  public articleCtrl: FormControl;
  private selectedArticle;

  constructor(private articleService: ArticleService) {
    this.articles = [];
    this.articleCtrl = new FormControl();
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
          .startWith(null)
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
