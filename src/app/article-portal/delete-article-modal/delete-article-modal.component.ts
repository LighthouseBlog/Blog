import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EditorService } from 'app/_services/editor.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

import { Article } from 'app/_models/Article';

@Component({
    selector: 'delete-article-modal',
    templateUrl: './delete-article-modal.component.html',
    styleUrls: ['./delete-article-modal.component.scss']
})
export class DeleteArticleModalComponent implements OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public article: Article;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Article,
                private editorService: EditorService,
                private dialogRef: MatDialogRef<DeleteArticleModalComponent>,
                private sms: SnackbarMessagingService) {
        this.article = data;
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    deleteArticle() {
        this.editorService.deleteArticle(this.data)
            .pipe(takeUntil(this.destroyed))
            .subscribe(result => {
                if (result) {
                    this.dialogRef.close('delete');
                }
            }, error => this.sms.displayError(error));
    }

}
