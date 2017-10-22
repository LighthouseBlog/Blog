import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../_services/authentication.service';
import { AuthorService } from '../_services/author.service';
import { FileValidator } from '../_directives/fileValidator.directive';

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

  constructor(
    fb: FormBuilder,
    private auth: AuthenticationService,
    private dialogRef: MatDialogRef<SettingsModalComponent>,
    private snackBar: MatSnackBar,
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
        console.log('Author', author);
        this.settingsGroup.setValue({
          'name': author.name,
          'email': author.email,
          'profilePicture': {}
        });
        this.username = author.username;
      }, error => {
        console.error('Error', error);
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
            this.snackBar.open('Updated user settings', '', {
              duration: 4000
            });
            this.dialogRef.close({name, image: result.image || ''});
          }, error => {
            this.saveInProgress = false;
            console.error('Error', error);
            this.snackBar.open(`Error updating user settings ${error}`, '', {
              duration: 4000
            });
          });
      } else {
        this.authorService.updateUserSettings(this.username, name, email)
          .subscribe(result => {
            this.saveInProgress = false;
            this.snackBar.open('Updated user settings', '', {
              duration: 4000
            });
            this.dialogRef.close({name});
          }, error => {
            this.saveInProgress = false;
            console.error('Error', error);
            this.snackBar.open(`Error updating user settings ${error}`, '', {
              duration: 4000
            })
          });
      }
    } else {
      this.snackBar.open('There was an error with the form before submission', '', {
        duration: 4000
      });
    }
  }

}
