import { Component } from '@angular/core';
import { Helpers } from "../../shared/helpers";

let componentName = 'topic-column'

@Component({
  selector: componentName,
  templateUrl: Helpers.getTemplatePath(componentName),
  styleUrls: [Helpers.getStylePath(componentName)]
})

export class TopicColumnComponent {
    about = 'I am Sam Pastoriza and I am developing a blog using Angular 2.';
}