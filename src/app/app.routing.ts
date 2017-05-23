import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
  // /editor
  {
    path: 'editor',
    component: EditorComponent
  }
];

export const Router = RouterModule.forRoot(routes);
