import { provideRouter, RouterConfig }  from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { ArticleComponent } from './components/article/article.component';
import { TopicComponent } from './components/topic/topic.component';

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
  },
  {
    path: 'blog/:id',
    component: ArticleComponent
  },
  {
    path: 'blog/:topic',
    component: TopicComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];