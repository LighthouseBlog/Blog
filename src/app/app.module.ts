import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { Router } from 'app/app.routing';

import { AuthGuard } from 'app/_guards/auth.guard';
import { AuthenticationService } from 'app/_services/authentication.service';
import { EditorService } from 'app/_services/editor.service';
import { ArticleService } from 'app/_services/article.service';
import { AuthorService } from 'app/_services/author.service';
import { ImagesService } from 'app/_services/images.service';
import { TagService } from 'app/_services/tags.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

import { TagComponent } from './articles/tag/tag.component';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

import { ResponseInterceptor } from 'app/_interceptors/response.interceptor';
import { AuthInterceptor } from 'app/_interceptors/auth.interceptor';

import { MaterialModule } from 'app/material.module';
import { ArticlePortalModule } from 'app/article-portal/article-portal.module';
import { PipeModule } from 'app/_pipes/pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginModalComponent,
    RegisterModalComponent,
    ArticlesComponent,
    ArticleComponent,
    TagComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Router,
    MaterialModule,
    ArticlePortalModule,
    PipeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    EditorService,
    ArticleService,
    AuthorService,
    ImagesService,
    TagService,
    SnackbarMessagingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    LoginModalComponent,
    RegisterModalComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
