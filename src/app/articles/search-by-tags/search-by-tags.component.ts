import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TagService } from 'app/_services/tags.service';
import { SnackbarMessagingService } from 'app/_services/snackbar-messaging.service';

@Component({
    selector: 'search-by-tags',
    templateUrl: './search-by-tags.component.html'
})
export class SearchByTagsComponent implements OnInit, OnDestroy {

    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
    @Output() onClearSelection: EventEmitter<any> = new EventEmitter();

    private destroyed: Subject<boolean> = new Subject<boolean>();

    tags: string[] = [];
    tagData: string[] = [];
    maxSize: number;

    constructor(private tagService: TagService,
                private sms: SnackbarMessagingService) { }

    ngOnInit() {
        this.tagService.getAllTags()
            .pipe(takeUntil(this.destroyed))
            .subscribe((tags) => {
                this.tagData = tags;
                this.tags = Object.keys(tags);
                this.maxSize = this.tags
                    .map((tag) => parseInt(tags[tag], 10))
                    .reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), 0);
            }, error => this.sms.displayError(error));
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    onClick(tag) {
        this.onSearch.emit(tag);
    }

    clearSelection() {
        this.onClearSelection.emit();
    }
}
