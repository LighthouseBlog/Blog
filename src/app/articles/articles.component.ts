import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../_services/article.service';
import { Router } from '@angular/router';
import { TagService } from '../_services/tags.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles;
  public tags: Promise<Array<String>>;
  private tagData: Object;

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
      });
  }

  selectedArticle(e) {
    this.articleService.setArticleId(e._id);
    this.router.navigate(['article', e._id]);
  }

  getArticlesByTag(tag: string) {
    this.articles = this.tagService.getArticlesByTag(tag);
  }

}
