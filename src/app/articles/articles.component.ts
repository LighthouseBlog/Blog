import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { ArticleService } from 'app/_services/article.service';
import { TagService } from 'app/_services/tags.service';
import { TagComponent } from './tag/tag.component';
import { ArticleList } from 'app/_models/ArticleList';

@Component({
    selector: 'articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public articles;
    public tags: Promise<Array<String>>;
    public tagData: Object;
    public maxSize: Number;
    public filteredArticles: Observable<ArticleList[]>;

    constructor(private articleService: ArticleService,
                private tagService: TagService,
                private router: Router) { }

    ngOnInit() {
        this.articles = this.articleService.getAllArticles();
        this.tagService.getAllTags()
            .takeUntil(this.destroyed)
            .subscribe((tags) => {
                this.tagData = tags;
                this.tags = Promise.resolve(Object.keys(tags));
                this.maxSize = Object.keys(tags)
                    .map((tag) => parseInt(tags[tag], 10))
                    .reduce((accumulator, currentValue) => {
                        return Math.max(accumulator, currentValue);
                    }, 0);
            });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
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
