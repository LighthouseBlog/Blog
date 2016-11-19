import { Component }          from '@angular/core';
import { Helpers } from "../../shared/helpers";

// import { HeroService }        from './blog.service';

let componentName = 'topic'

@Component({
  selector: componentName,

  templateUrl: Helpers.getTemplatePath(componentName),
  styleUrls: [Helpers.getStylePath(componentName)],
  // providers: [
  //   HeroService,
  // ]
})
export class TopicComponent {

}