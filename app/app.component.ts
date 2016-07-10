import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

// import { BlogService }        from './blog.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   BlogService,
  // ]
})
export class AppComponent {
  title = "Numbers Don't Define Us";
  subtitle = "A food lovers blog";
}