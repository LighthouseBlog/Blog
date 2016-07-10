import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Helpers } from "../../shared/helpers";

// import { HeroService }        from './blog.service';

let componentName = 'article';

@Component({
  selector: componentName,

  templateUrl: Helpers.getTemplatePath(componentName),
  styleUrls: [Helpers.getStylePath(componentName)],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   HeroService,
  // ]
})
export class ArticleComponent {
  
}