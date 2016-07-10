import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Helpers } from "../../shared/helpers";
import { ArchiveColumnComponent } from "../archive-column/archive-column.component";
import { BlogColumnComponent } from "../blog-column/blog-column.component";
import { TopicColumnComponent } from "../topic-column/topic-column.component";

// import { HeroService }        from './blog.service';

let componentName = 'dashboard';

@Component({
  selector: componentName,

  templateUrl: Helpers.getTemplatePath(componentName),
  styleUrls: [Helpers.getStylePath(componentName)],
  directives: [ROUTER_DIRECTIVES, ArchiveColumnComponent, BlogColumnComponent, TopicColumnComponent],
  // providers: [
  //   HeroService,
  // ]
})
export class DashboardComponent {
  
}