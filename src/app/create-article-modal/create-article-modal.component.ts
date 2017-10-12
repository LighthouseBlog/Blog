import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { EditorService } from '../_services/editor.service';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent implements OnInit {

  title = 'Create a new article';
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<CreateArticleModalComponent>,
    private editorService: EditorService
  ) {
    this.formGroup = this.fb.group({
      'articleTitle': new FormControl('', Validators.required),
      'articleDescription': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  create(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      console.log('Creating new article');

      const articleTitle = formValue['articleTitle'];
      const articleDescription = formValue['articleDescription'];

      this.editorService.setArticleTitle(articleTitle);
      this.editorService.setArticleDescription(articleDescription);

      this.editorService.createArticle()
        .subscribe(results => {
          if (!isNaN(results['_id'])) {
            this.editorService.setArticleId(results['_id']);
            this.dialogRef.close('closed');
            this.router.navigate(['edit', results['_id']]);
          } else {
            console.error('An error has occured, the article title was saved.');
          }
        })
    }
  }

}
