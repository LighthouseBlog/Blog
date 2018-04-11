import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from 'app/_services/authentication.service';
import { AuthorService } from 'app/_services/author.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';
import { FileValidator } from 'app/_directives/fileValidator.directive';

import { ImagePreviewComponent } from 'app/article-portal/image-preview/image-preview.component';

@Component({
    selector: 'settings-modal',
    templateUrl: './settings-modal.component.html',
    styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit, OnDestroy {

    private profilePictureUpdated: boolean;
    private destroyed: Subject<boolean> = new Subject<boolean>();

    public settingsGroup: FormGroup;
    public username: string;
    public saveInProgress: boolean;
    public image: any;

    constructor(private fb: FormBuilder,
                private auth: AuthenticationService,
                private dialogRef: MatDialogRef<SettingsModalComponent>,
                private dialog: MatDialog,
                private snackBarMessagingService: SnackbarMessagingService,
                private authorService: AuthorService) {
        this.settingsGroup = this.fb.group({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'profilePicture': new FormControl('', [FileValidator.validate])
        });
    }

    ngOnInit() {
        this.authorService.getAuthor()
            .takeUntil(this.destroyed)
            .subscribe(author => {
                this.settingsGroup.patchValue({
                    'name': author.name,
                    'email': author.email,
                    'profilePicture': {}
                });
                this.image = author.profilePicture;
                this.profilePictureUpdated = false;
                this.username = author.username;
            });
        this.saveInProgress = false;
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    saveSettings(formValue: any, isFormValid: boolean) {
        if (isFormValid) {
            this.saveInProgress = true;
            const name = formValue['name'];
            const email = formValue['email'];
            const profilePicture = formValue['profilePicture'];

            if (profilePicture && this.profilePictureUpdated) {
                const formData = new FormData();
                const file = this.getProfilePicture(profilePicture);
                formData.append('profilePicture', file);

                this.authorService.updateUserSettings(this.username, name, email, formData)
                    .takeUntil(this.destroyed)
                    .subscribe(result => {
                        this.saveInProgress = false;
                        this.snackBarMessagingService.displaySuccess('Updated user settings', 4000);
                        this.dialogRef.close({ name, image: result.data.profilePicture || '' });
                    }, error => {
                        this.saveInProgress = false;
                        this.snackBarMessagingService.displayError(error, 4000);
                    });
            } else {
                this.authorService.updateUserSettings(this.username, name, email)
                    .takeUntil(this.destroyed)
                    .subscribe(result => {
                        this.saveInProgress = false;
                        this.snackBarMessagingService.displaySuccess('Updated user settings', 4000);
                        this.dialogRef.close({ name });
                    }, error => {
                        this.saveInProgress = false;
                        this.snackBarMessagingService.displayError(error, 4000);
                    });
            }
        } else {
            this.snackBarMessagingService.displayErrorMessage('Validation errors exists', 4000);
        }
    }

    getProfilePicture(profilePicture: any) {
        if (profilePicture.target) {
            return profilePicture.target.files[0];
        }
        return profilePicture;
    }

    fileChangeListener($event) {
        const file = $event.target.files[0];
        const myReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => {
            this.image = loadEvent.target.result;
            this.profilePictureUpdated = true;
        };

        myReader.readAsDataURL(file);
    }

    openPreview() {
        const dialogRef = this.dialog.open(ImagePreviewComponent, {
            maxHeight: '400px',
            maxWidth: '400px',
            data: {
                src: this.image,
                aspectRatio: 1
            }
        });

        dialogRef.afterClosed()
            .takeUntil(this.destroyed)
            .subscribe(result => {
                if (result) {
                    this.settingsGroup.patchValue({
                        profilePicture: result
                    });
                    this.profilePictureUpdated = true;
                    this.snackBarMessagingService.displaySuccess('Image has been cropped', 4000);
                }
            });
    }

    previewImage(): boolean {
        return !!this.image;
    }

}
