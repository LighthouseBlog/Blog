import { Injectable } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CreateArticleFormService {

    constructor(private fb: FormBuilder) {}

    buildForm(): FormGroup {
        return this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]]
        });
    }
}
