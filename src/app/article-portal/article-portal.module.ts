import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { EditorComponent } from './editor/editor.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { CreateArticleModalComponent } from './create-article-modal/create-article-modal.component';

import { DeleteArticleModalComponent } from './delete-article-modal/delete-article-modal.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { ArticleListComponent } from './user-articles/article-list/article-list.component';

import { AuthInterceptor } from 'app/_interceptors/auth.interceptor';


@NgModule({
  declarations: [
    EditorComponent,
    UserArticlesComponent,
    CreateArticleModalComponent,
    DeleteArticleModalComponent,
    SettingsModalComponent,
    ArticleListComponent
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  entryComponents: [
    CreateArticleModalComponent,
    DeleteArticleModalComponent,
    SettingsModalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class ArticlePortalModule { }
