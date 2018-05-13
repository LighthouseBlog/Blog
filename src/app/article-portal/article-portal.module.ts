import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from 'app/app.routing';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { FileValidator } from 'app/_directives/fileValidator.directive';
import { FileValueAccessor } from 'app/_directives/fileValueAccessor.directive';

import { EditorComponent } from './editor/editor.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { CreateArticleModalComponent } from './create-article-modal/create-article-modal.component';

import { DeleteArticleModalComponent } from './delete-article-modal/delete-article-modal.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { ArticleListComponent } from './user-articles/article-list/article-list.component';
import { ImagePreviewComponent } from 'app/article-portal/image-preview/image-preview.component';

import { MaterialModule } from 'app/material.module';

@NgModule({
    declarations: [
        FileValidator,
        FileValueAccessor,
        EditorComponent,
        UserArticlesComponent,
        CreateArticleModalComponent,
        DeleteArticleModalComponent,
        SettingsModalComponent,
        ArticleListComponent,
        ImagePreviewComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        Router,
        MaterialModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
    ],
    entryComponents: [
        CreateArticleModalComponent,
        DeleteArticleModalComponent,
        SettingsModalComponent,
        ImagePreviewComponent
    ]
})
export class ArticlePortalModule { }
