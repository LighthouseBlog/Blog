import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { TagService } from '../../_services/tags.service';

@Component({
    selector: 'search-by-tags',
    templateUrl: './search-by-tags.component.html'
})
export class SearchByTagsComponent implements OnInit, OnDestroy {

    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public tags: Promise<string[]>;
    public tagData: string[];
    public maxSize: number;

    constructor(private tagService: TagService) { }

    ngOnInit() {
        this.tagService.getAllTags()
            .takeUntil(this.destroyed)
            .subscribe((tags) => {
                this.tagData = tags;
                this.tags = Promise.resolve(Object.keys(tags));
                this.maxSize = Object.keys(tags)
                    .map((tag) => parseInt(tags[tag], 10))
                    .reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), 0);
            });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    onClick(tag) {
        this.onSearch.emit(tag);
    }
}
