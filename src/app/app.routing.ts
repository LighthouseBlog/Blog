import { Routes, RouterModule } from '@angular/router';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
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
