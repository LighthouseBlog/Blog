import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import  { RouterTestingModule } from '@angular/router/testing';

import { NavBarComponent } from './nav-bar.component';
import { MaterialModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import 'hammerjs';

class MockRouter {
    navigateByUrl(url: string) { return url; }
}

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterTestingModule ],
      declarations: [ NavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as title 'Sample Angular Application'`, async(() => {
    const fixture = TestBed.createComponent(NavBarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sample Angular Application');
  }));
});
