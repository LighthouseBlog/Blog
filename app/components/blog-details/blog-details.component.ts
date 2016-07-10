import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Helpers } from "../../shared/helpers";

// import { BlogService }        from './blog.service';

let componentName = 'blog-details';

@Component({
  selector: componentName,

  templateUrl: Helpers.getTemplatePath(componentName),
  styleUrls: [Helpers.getStylePath(componentName)],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   BlogService,
  // ]
})
export class BlogDetailsComponent {
  title = "Article Number 1";
}