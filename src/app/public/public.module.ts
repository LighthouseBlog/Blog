import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

import { TagComponent } from './articles/tag/tag.component';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';


@NgModule({
  declarations: [
    LoginModalComponent,
    RegisterModalComponent,
    ArticlesComponent,
    ArticleComponent,
    TagComponent
  ],
  entryComponents: [
    LoginModalComponent,
    RegisterModalComponent,
  ]
})
export class PublicModule { }
