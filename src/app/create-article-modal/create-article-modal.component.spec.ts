import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleModalComponent } from './create-article-modal.component';

describe('CreateArticleModalComponent', () => {
  let component: CreateArticleModalComponent;
  let fixture: ComponentFixture<CreateArticleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArticleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
