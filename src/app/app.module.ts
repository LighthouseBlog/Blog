import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { MatGridListModule, MatDialogModule } from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import 'hammerjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

import {Router} from './app.routing';
import { EditorComponent } from './editor/editor.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { CreateArticleModalComponent } from './create-article-modal/create-article-modal.component';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { EditorService } from './_services/editor.service';
import { ArticleService } from './_services/article.service';
import { AuthorService } from './_services/author.service';
import { ImagesService } from './_services/images.service';
import { TagService } from './_services/tags.service';

import { FileValidator } from './_directives/fileValidator.directive';
import { FileValueAccessor } from './_directives/fileValueAccessor.directive';

import { BaseRequestOptions } from '@angular/http';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { DeleteArticleModalComponent } from './delete-article-modal/delete-article-modal.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginModalComponent,
    RegisterModalComponent,
    EditorComponent,
    UserArticlesComponent,
    CreateArticleModalComponent,
    ArticlesComponent,
    ArticleComponent,
    DeleteArticleModalComponent,
    SettingsModalComponent,
    FileValidator,
    FileValueAccessor
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    Router,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MaterialModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    CreateArticleModalComponent,
    DeleteArticleModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
    SettingsModalComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    EditorService,
    ArticleService,
    AuthorService,
    ImagesService,
    TagService,
    BaseRequestOptions
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
