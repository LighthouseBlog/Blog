import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { EditorComponent } from './editor/editor.component';
import { AuthGuard } from './_guards/auth.guard';

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
    component: UserArticlesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const Router = RouterModule.forRoot(routes);
