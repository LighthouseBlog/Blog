import { NgModule } from '@angular/core';

import { ProgressiveImageLoaderDirective } from '../_directives/progressiveImageLoader.directive';
import { FileValidator } from './fileValidator.directive';
import { FileValueAccessor } from './fileValueAccessor.directive';

@NgModule({
    declarations: [
        FileValidator,
        FileValueAccessor,
        ProgressiveImageLoaderDirective
    ],
    exports: [
        FileValidator,
        FileValueAccessor,
        ProgressiveImageLoaderDirective
    ]
})
export class DirectiveModule { }
