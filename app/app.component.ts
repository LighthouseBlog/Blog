import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

// import { BlogService }        from './blog.service';

@Component({
  selector: 'my-app',

  template: `
    <h1>{{title}}</h1>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   BlogService,
  // ]
})
export class AppComponent {
  title = "Numbers Don't Define Us";
}