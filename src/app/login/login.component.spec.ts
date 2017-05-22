import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import 'hammerjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterModule, ReactiveFormsModule, FormsModule ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initial State', () => {
    it(`should have as title 'Login'`, async (() => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('Login');
    }));
    it('form should be falsy', async () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.formGroup.valid).toBeFalsy();
    });
    it('username validity', async () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.formGroup.controls['username'].valid).toBeFalsy();
    });
    it('password required validity', async () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.debugElement.componentInstance;
      let errors = {};
      let password = app.formGroup.controls['password'];
      errors = password.errors || {};
      expect(errors['required']).toBeTruthy();
    });
  });

  describe('LoginForm', () => {
    let username = {};
    let password = {};
    let errors = {};
    let app;

    beforeEach(() => {
      const fixture = TestBed.createComponent(LoginComponent);
      app = fixture.debugElement.componentInstance;
      errors = {};
    });

    it('should set username', async () => {
      const username = app.formGroup.controls['username'];
      username.setValue('testUsername');
      errors = username.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('should set password', async () => {
      const password = app.formGroup.controls['password'];
      password.setValue('testPassword');
      errors = password.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('should set the form to be valid', async () => {
      app.formGroup.controls['username'].setValue('testUsername');
      app.formGroup.controls['password'].setValue('testPassword');
      expect(app.formGroup.valid).toBeTruthy();
    })
  });


  describe('login()', () => {
    it('should print out the login information', async () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(console, 'log');
      app.formGroup.controls['username'].setValue('testUsername');
      app.formGroup.controls['password'].setValue('testPassword');
      app.login(app.formGroup.value, app.formGroup.valid);
      expect(console.log).toHaveBeenCalledTimes(3);
    });
  });
});
