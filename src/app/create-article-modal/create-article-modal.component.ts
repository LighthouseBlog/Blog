import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.css']
})
export class CreateArticleModalComponent implements OnInit {

  title = 'Create a new article';
  formGroup: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.formGroup = fb.group({
      'articleTitle': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  create(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      console.log('Creating new article');
      console.log('Article Title', formValue['articleTitle']);
      this.router.navigate(['articles', 'edit', 'id']);
    }
  }

}
