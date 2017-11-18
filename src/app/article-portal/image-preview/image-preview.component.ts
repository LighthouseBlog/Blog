import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Cropper from 'cropperjs'
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit, OnDestroy {

  private cropper: Cropper;
  private originalImage: any;
  public showingCroppingTools: boolean;
  private imageBlob: any;
  private cropped: boolean;
  private croppedCanvas: any;

  constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    private snackbarMessagingService: SnackbarMessagingService,
    @Inject(MAT_DIALOG_DATA) public image: any
  ) {
    this.originalImage = image;
    this.cropped = false;
  }

  ngOnInit() {
    this.showingCroppingTools = false;
  }

  ngOnDestroy() {
    this.cropper = null;
  }

  showCropperTool() {
    const image = document.getElementById('image');
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9
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
      this.snackbarMessagingService.displayError('No changes detected', 2000);
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
      this.snackbarMessagingService.displayError('No changes detected', 2000);
    }
  }

  onNoClick(): void {
    this.stop();
    this.dialogRef.close();
  }
}
