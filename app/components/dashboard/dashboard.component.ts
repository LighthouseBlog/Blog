import { Component }          from '@angular/core';
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
  // providers: [
  //   HeroService,
  // ]
})
export class DashboardComponent {
  
}