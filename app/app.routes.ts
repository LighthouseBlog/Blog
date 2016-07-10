import { provideRouter, RouterConfig }  from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { BlogDetailsComponent } from './blog-details.component';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'blog',
    component: BlogDetailsComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];