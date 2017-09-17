import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  // /register
  {
    path: 'register',
    component: RegisterComponent
  },
  // /articles
  {
    path: 'articles',
    component: UserArticlesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article/:id',
    component: ArticleComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const Router = RouterModule.forRoot(routes);
