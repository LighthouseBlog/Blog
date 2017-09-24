import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

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

  constructor(
    fb: FormBuilder,
    private auth: AuthenticationService,
    private dialogRef: MdDialogRef<SettingsModalComponent>,
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
      })
  }

  saveSettings(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      const name = formValue['name'];
      const email = formValue['email'];
      const profilePicture = formValue['profilePicture'];
      console.log('profilepicture', profilePicture);
      if (profilePicture.target) {
        const formData = new FormData();
        const file = profilePicture.target.files[0];
        console.log('Profile Picture', file);
        formData.append('profilePicture', file);
        this.authorService.updateUserSettings(this.username, name, email, formData)
          .subscribe(result => {
            console.log('Result', result);
          }, error => {
            console.error('Error', error);
          });
      } else {
        this.authorService.updateUserSettings(this.username, name, email)
          .subscribe(result => {
            console.log('Result', result);
          }, error => {
            console.error('Error', error);
          });
      }
    } else {
      console.log('Issues?');
      console.log('FormValue', formValue);
      // TODO: Snackbar time!!
    }
  }

}
