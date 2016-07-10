import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

// import { BlogService }        from './blog.service';

@Component({
  selector: 'blog-details',

  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard Route</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/blog-details.component.css'],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   BlogService,
  // ]
})
export class BlogDetailsComponent {
  title = "Article Number 1";
}