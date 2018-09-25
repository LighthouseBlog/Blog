import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../material.module';
import { PipeModule } from '../_pipes/pipe.module';

import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticlesComponent } from './articles.component';
import { SiteInfoComponent } from './site-info/site-info.component';
import { TagComponent } from './search-by-tags/tag/tag.component';
import { SearchByTitleComponent } from './search-by-title/search-by-title.component';
import { SearchByTagsComponent } from './search-by-tags/search-by-tags.component';

@NgModule({
    declarations: [
        ArticlePreviewComponent,
        ArticlesComponent,
        SiteInfoComponent,
        TagComponent,
        SearchByTitleComponent,
        SearchByTagsComponent
    ],
    imports: [
        MaterialModule,
        PipeModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        InfiniteScrollModule
    ]
})
export class ArticlesModule { }
