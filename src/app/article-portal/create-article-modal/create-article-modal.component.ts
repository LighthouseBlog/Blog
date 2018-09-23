import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EditorService } from 'app/_services/editor.service';
import { SnackbarMessagingService } from '../../_services/snackbar-messaging.service';

@Component({
    selector: 'create-article-modal',
    templateUrl: './create-article-modal.component.html',
    styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent implements OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public title = 'Create a new article';
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private dialogRef: MatDialogRef<CreateArticleModalComponent>,
                private editorService: EditorService,
                private sms: SnackbarMessagingService) {
        this.formGroup = this.fb.group({
            'articleTitle': new FormControl('', Validators.required),
            'articleDescription': new FormControl('', Validators.required)
        });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    create(formValue: any, isFormValid: boolean) {
        if (isFormValid) {

            const articleTitle = formValue['articleTitle'];
            const articleDescription = formValue['articleDescription'];

            this.editorService.createArticle(articleTitle, articleDescription)
                .pipe(takeUntil(this.destroyed))
                .subscribe(results => {
                    const id = results.id;
                    if (!Number.isNaN(id)) {
                        this.editorService.setArticleId(id);
                        this.dialogRef.close('closed');
                        this.router.navigateByUrl('/edit/' + id);
                    } else {
                        this.sms.displayErrorMessage(`The article id generated was not a number.
                        The article was saved but should be deleted and redone.`);
                    }
                }, error => this.sms.displayError(error));
        }
    }

}
