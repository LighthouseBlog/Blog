import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AuthenticationService } from 'app/_services/authentication.service';
import { AuthorService } from 'app/_services/author.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

import { FileValidator } from 'app/_directives/fileValidator.directive';
import { ImagePreviewComponent } from 'app/article-portal/image-preview/image-preview.component';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  settingsGroup: FormGroup;
  fileContent: any;
  username: string;
  public saveInProgress: boolean;
  public image: any;

  constructor(
    fb: FormBuilder,
    private auth: AuthenticationService,
    private dialogRef: MatDialogRef<SettingsModalComponent>,
    private dialog: MatDialog,
    private snackBarMessagingService: SnackbarMessagingService,
    private authorService: AuthorService) {
      this.settingsGroup = fb.group({
        'name': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required),
        'profilePicture': new FormControl('', [FileValidator.validate])
      });
    }

  ngOnInit() {
    this.authorService.getAuthor()
      .subscribe(author => {
        this.settingsGroup.setValue({
          'name': author.name,
          'email': author.email,
          'profilePicture': {}
        });
        this.image = author.profilePicture;
        this.username = author.username;
      });
    this.saveInProgress = false;
  }

  saveSettings(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      this.saveInProgress = true;
      const name = formValue['name'];
      const email = formValue['email'];
      const profilePicture = formValue['profilePicture'];
      if (profilePicture.target) {
        const formData = new FormData();
        const file = profilePicture.target.files[0];
        formData.append('profilePicture', file);
        this.authorService.updateUserSettings(this.username, name, email, formData)
          .subscribe(result => {
            this.saveInProgress = false;
            this.snackBarMessagingService.displayError('Updated user settings', 4000);
            this.dialogRef.close({name, image: result.image || ''});
          }, error => {
            this.saveInProgress = false;
            this.snackBarMessagingService.displayError(`Error updating user settings ${error}`, 4000);
          });
      } else {
        this.authorService.updateUserSettings(this.username, name, email)
          .subscribe(result => {
            this.saveInProgress = false;
            this.snackBarMessagingService.displayError('Updated user settings', 4000);
            this.dialogRef.close({name});
          }, error => {
            this.saveInProgress = false;
            this.snackBarMessagingService.displayError(`Error updating user settings ${error}`, 4000);
          });
      }
    } else {
      this.snackBarMessagingService.displayError('Validation errors exists', 4000);
    }
  }

  fileChangeListener($event) {
    const file = $event.target.files[0];
    const myReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      this.image = loadEvent.target.result;
    };

    myReader.readAsDataURL(file);
  }

  openPreview() {
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: this.image
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  previewImage(): boolean {
    return !!this.image;
  }

}
