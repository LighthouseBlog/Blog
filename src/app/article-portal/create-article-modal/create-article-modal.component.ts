import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { EditorService } from 'app/_services/editor.service';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent {

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

  create(formValue: any, isFormValid: boolean) {
    if (isFormValid) {

      const articleTitle = formValue['articleTitle'];
      const articleDescription = formValue['articleDescription'];

      this.editorService.createArticle(articleTitle, articleDescription)
        .subscribe(results => {
          const id = results._id;
          if (!Number.isNaN(id)) {
            this.editorService.setArticleId(id);
            this.dialogRef.close('closed');
            this.router.navigateByUrl('/edit/' + id);
          } else {
            console.error('The article id generated was not a number. The article was saved but should be deleted and redone.');
          }
        })
    }
  }

}
