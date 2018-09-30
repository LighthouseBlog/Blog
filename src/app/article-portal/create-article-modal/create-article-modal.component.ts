import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EditorService } from 'app/_services/editor.service';
import { SnackbarMessagingService } from '../../_services/snackbar-messaging.service';
import { CreateArticleFormService } from './create-article-form.service';

@Component({
    selector: 'create-article-modal',
    templateUrl: './create-article-modal.component.html',
    styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    createArticleForm: FormGroup;

    constructor(private router: Router,
                private dialogRef: MatDialogRef<CreateArticleModalComponent>,
                private editorService: EditorService,
                private sms: SnackbarMessagingService,
                private formService: CreateArticleFormService) {}

    ngOnInit() {
        this.createArticleForm = this.formService.buildForm();
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    create(formValue: any, isFormValid: boolean) {
        if (isFormValid) {
            this.editorService.createArticle(formValue.title, formValue.description)
                .pipe(takeUntil(this.destroyed))
                .subscribe(results => {
                    const id = results.id;
                    if (!Number.isNaN(id)) {
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
