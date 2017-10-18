import { Component, Input, HostBinding, OnChanges } from '@angular/core';

import { Router } from '@angular/router';

const MAX_SIZE = 30;

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnChanges {
  @Input() tag: string;
  @Input() fontSize: number;
  @Input() maxSize: number;

  @HostBinding('style.font-size.pt') size: number;

  ngOnChanges() {
    this.size = (this.fontSize / this.maxSize) * MAX_SIZE
    console.log('size', this.size);
  }
}
