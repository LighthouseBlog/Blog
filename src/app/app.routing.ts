import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  // /login
  {
    path: 'login',
    component: LoginComponent
  },
  // /register
  {
    path: 'register',
    component: RegisterComponent
  },
  // /articles
  {
    path: 'articles',
    component: UserArticlesComponent
  },
  {
      path: 'edit/:id',
      component: EditorComponent
    }
];

export const Router = RouterModule.forRoot(routes);
