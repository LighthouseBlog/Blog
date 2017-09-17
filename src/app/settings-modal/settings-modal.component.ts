import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { AuthenticationService } from '../_services/authentication.service';
import { FileValidator } from '../_directives/fileValidator.directive';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  settingsGroup: FormGroup;
  fileContent: any;

  constructor(
    fb: FormBuilder,
    private auth: AuthenticationService,
    private dialogRef: MdDialogRef<SettingsModalComponent>) {
      this.settingsGroup = fb.group({
        'name': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required),
        'profilePicture': new FormControl('', [FileValidator.validate])
      });
    }

  ngOnInit() {
  }

  saveSettings(formValue: any, isFormValid: boolean) {
    console.log('Saving Settings');
  }

}
