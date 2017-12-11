import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';


@NgModule({
  declarations: [
    SanitizeHtmlPipe
  ],
  exports: [
    SanitizeHtmlPipe
  ]
})
export class PipeModule { }
