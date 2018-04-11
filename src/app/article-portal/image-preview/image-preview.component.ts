import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Cropper from 'cropperjs'

import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';
import { Image } from 'app/_models/Image';

@Component({
    selector: 'image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit, OnDestroy {

    private cropper: Cropper;
    private originalImage: any;
    private imageBlob: any;
    private cropped: boolean;
    private croppedCanvas: any;
    private aspectRatio: number = 16 / 9;

    public showingCroppingTools: boolean;

    constructor(public dialogRef: MatDialogRef<ImagePreviewComponent>,
                private snackbarMessagingService: SnackbarMessagingService,
                @Inject(MAT_DIALOG_DATA) public image: Image) {
        this.originalImage = image.src;
        this.aspectRatio = image.aspectRatio;
        this.cropped = false;
    }

    ngOnInit() {
        this.showingCroppingTools = false;
    }

    ngOnDestroy() {
        this.cropper = null;
    }

    showCropperTool() {
        const image = document.getElementById('image') as HTMLImageElement;
        this.cropper = new Cropper(image, {
            aspectRatio: this.aspectRatio
        });
        this.showingCroppingTools = true;
    }

    cropImage() {
        this.cropped = true;
        this.croppedCanvas = this.cropper.getCroppedCanvas();
        const imageData = this.croppedCanvas.toDataURL();
        this.cropper.replace(imageData);
    }

    save() {
        if (this.cropped) {
            const image = document.getElementById('image').getAttribute('src');
            const imageData = this.croppedCanvas.toBlob((blob) => {
                this.imageBlob = blob;
                this.stop();
                document.getElementById('image').setAttribute('src', image);
            });
        } else {
            this.snackbarMessagingService.displayMessage('No changes detected', 2000);
        }
    }

    stop() {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
            this.showingCroppingTools = false;
        }
    }

    restore() {
        this.cropper.replace(this.originalImage);
        this.cropped = false;
    }

    saveImage() {
        if (this.cropped) {
            this.dialogRef.close(this.imageBlob);
        } else {
            this.snackbarMessagingService.displayMessage('No changes detected', 2000);
        }
    }

    onNoClick(): void {
        this.stop();
        this.dialogRef.close();
    }
}
