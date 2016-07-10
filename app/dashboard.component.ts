import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

// import { HeroService }        from './blog.service';

@Component({
  selector: 'blog-details',

  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/blog']" routerLinkActive="active">Blog Details Route</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   HeroService,
  // ]
})
export class DashboardComponent {
  title = "Dashboard";
}