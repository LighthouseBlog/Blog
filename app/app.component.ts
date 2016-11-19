import { Component } from '@angular/core';
import { Helpers } from "./shared/helpers";

let componentName = 'app'

@Component({
  selector: componentName,
  templateUrl: Helpers.getTemplatePath(componentName),
  styleUrls: [Helpers.getStylePath(componentName)]
})

export class AppComponent {
  title = "An Angular Blog";
  subtitle = "A blog by Sam Pastoriza in Angular 2 with material design";
}