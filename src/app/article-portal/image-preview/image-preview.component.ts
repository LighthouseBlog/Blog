import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Cropper from 'cropperjs'

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {

  private cropper: Cropper;

  constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public image: any
  ) {
    console.log('Image', this.image);
  }

  showCropperTool() {
    const image = document.getElementById('image');
    console.log('Image', image);
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9
    });
  }

  crop() {
    this.cropper.crop();
    const data = this.cropper.getData();
    console.log('Data', data);
    this.stop();
  }

  stop() {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }

  onNoClick(): void {
    this.stop();
    this.dialogRef.close();
  }
}
