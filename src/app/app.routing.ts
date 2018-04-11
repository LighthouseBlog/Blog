import { Routes, RouterModule } from '@angular/router';
import { UserArticlesComponent } from 'app/article-portal/user-articles/user-articles.component';
import { EditorComponent } from 'app/article-portal/editor/editor.component';
import { ArticleComponent } from 'app/article/article.component';
import { AuthGuard } from 'app/_guards/auth.guard';
import { ArticlesComponent } from 'app/articles/articles.component';

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
        path: '',
        component: ArticlesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export const Router = RouterModule.forRoot(routes);
