import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Cropper from 'cropperjs'
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  private cropper: Cropper;
  private originalImage: any;
  public showingCroppingTools: boolean;

  constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    private snackbarMessagingService: SnackbarMessagingService,
    @Inject(MAT_DIALOG_DATA) public image: any
  ) {
    this.originalImage = image;
  }

  ngOnInit() {
    this.showingCroppingTools = false;
  }

  showCropperTool() {
    const image = document.getElementById('image');
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9
    });
    this.showingCroppingTools = true;
  }

  cropImage() {
    const imageData = this.cropper.getCroppedCanvas().toDataURL('image/png');
    this.cropper.replace(imageData);
  }

  save() {
    const imageData = this.cropper.getCroppedCanvas().toBlob((blob) => {
      this.stop();
      this.dialogRef.close(blob);
    });
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
  }

  onNoClick(): void {
    this.stop();
    this.dialogRef.close();
  }
}
