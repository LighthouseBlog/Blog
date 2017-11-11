import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {Router} from 'app/app.routing';

import { AuthGuard } from 'app/_guards/auth.guard';
import { AuthenticationService } from 'app/_services/authentication.service';
import { EditorService } from 'app/_services/editor.service';
import { ArticleService } from 'app/_services/article.service';
import { AuthorService } from 'app/_services/author.service';
import { ImagesService } from 'app/_services/images.service';
import { TagService } from 'app/_services/tags.service';

import { FileValidator } from 'app/_directives/fileValidator.directive';
import { FileValueAccessor } from 'app/_directives/fileValueAccessor.directive';

import { ResponseInterceptor } from 'app/_interceptors/response.interceptor';

import { MaterialModule } from 'app/material.module';
import { ArticlePortalModule } from 'app/article-portal/article-portal.module';
import { PublicModule } from 'app/public/public.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FileValidator,
    FileValueAccessor
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    Router,
    MaterialModule,
    ArticlePortalModule,
    PublicModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    EditorService,
    ArticleService,
    AuthorService,
    ImagesService,
    TagService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
