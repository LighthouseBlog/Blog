import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ArticleService } from '../_services/article.service';
import { Router } from '@angular/router';
import { TagService } from '../_services/tags.service';
import { TagComponent } from './tag/tag.component';
import { ArticleList } from '../_models/ArticleList';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles;
  public tags: Promise<Array<String>>;
  public tagData: Object;
  public maxSize: Number
  public filteredArticles: Observable<ArticleList[]>;

  constructor(
    private articleService: ArticleService,
    private tagService: TagService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articles = this.articleService.getAllArticles();
    this.tagService.getAllTags()
      .subscribe((tags) => {
        this.tagData = tags;
        this.tags = Promise.resolve(Object.keys(tags));
        this.maxSize = Object.keys(tags).map((tag) => {
            return parseInt(tags[tag], 10);
          }).reduce((accumulator, currentValue) => {
            return Math.max(accumulator, currentValue);
          }, 0);
      });
  }

  selectedArticle(e) {
    this.articleService.setArticleId(e._id);
    this.router.navigate(['article', e._id]);
  }

  getArticlesByTag(tag: string) {
    this.articles = this.tagService.getArticlesByTag(tag);
  }

  filterArticles(title: string) {
    this.filteredArticles = this.articleService.getArticlesByTitle(title);
  }

  articleSelected(article: ArticleList) {
    this.router.navigate(['article', article._id]);
  }

}
