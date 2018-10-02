import {
    AfterContentInit, Directive, ElementRef, Input, OnDestroy,
    Renderer2
} from '@angular/core';
import { ImageSet } from '../_models/ImageSet';

@Directive({
    selector: '[image-loader]'
})
export class ProgressiveImageLoaderDirective implements AfterContentInit, OnDestroy {
    private nativeElement: HTMLElement;
    private cancelOnError: Function;
    private cancelOnLoad: Function;
    private largeImage;
    acceptedSizes = ['small', 'medium', 'large'];

    @Input() imgSize: string;
    @Input() urlSet: ImageSet;

    constructor(private el: ElementRef,
                private renderer: Renderer2) {}

    ngAfterContentInit() {
        this.registerEvents();
    }

    ngOnDestroy() {
        this.removeErrorEvent();
        this.removeOnLoadEvent();
    }

    registerEvents() {
        this.nativeElement = this.el.nativeElement;
        this.onError = this.onError.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.cancelOnError = this.renderer.listen(this.nativeElement, 'error', this.onError);
        this.cancelOnLoad = this.renderer.listen(this.nativeElement, 'load', this.onLoad);
    }

    loadInputImage() {
        if (this.acceptedSizes.includes(this.imgSize) && this.imgSize !== 'small') {
            this.largeImage = new Image();
            this.largeImage.src = this.urlSet[this.imgSize];
            this.largeImage.onload = () => {
                this.renderer.setAttribute(this.nativeElement, 'src', this.largeImage.src);
            }
        }
    }

    private onError() {
        console.error('An error occured while loading the image');
    }

    private onLoad() {
        this.removeOnLoadEvent();
        this.loadInputImage();
    }

    private removeErrorEvent() {
        if (this.cancelOnError) {
            this.cancelOnError();
        }
    }

    private removeOnLoadEvent() {
        if (this.cancelOnLoad) {
            this.cancelOnLoad();
        }
    }
}
