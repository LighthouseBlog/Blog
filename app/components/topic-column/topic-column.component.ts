import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Helpers } from "../../shared/helpers";

// import { HeroService }        from './blog.service';

let componentName = 'topic-column'

@Component({
  selector: componentName,

  templateUrl: Helpers.getTemplatePath(componentName),
  styleUrls: [Helpers.getStylePath(componentName)],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   HeroService,
  // ]
})
export class TopicColumnComponent {
    about = 'Hi, I am Janna Safran and I am the author of this blog. I am a second year student at Dickinson College. Contact me at janna.safran@gmail.com if you have any questions.';

}