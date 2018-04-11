import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const MAX_SIZE = 30;

@Component({
    selector: 'tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
    @Input() tag: string;
    @Input() fontSize: number;
    @Input() maxSize: number;

    @HostBinding('style.font-size.pt') size: number;

    ngOnInit() {
        this.size = (this.fontSize / this.maxSize) * MAX_SIZE;
    }
}
