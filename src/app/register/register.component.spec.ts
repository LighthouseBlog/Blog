import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Routes, RouterModule } from '@angular/router';
import 'hammerjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterModule, FormsModule, ReactiveFormsModule ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initial State', () => {
    it(`should have as title 'Register'`, async(() => {
      const fixture = TestBed.createComponent(RegisterComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('Register');
    }));
    it('form should be falsy', async () => {
      const fixture = TestBed.createComponent(RegisterComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.registerGroup.valid).toBeFalsy();
    });
    it('username validity', async () => {
      const fixture = TestBed.createComponent(RegisterComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.registerGroup.controls['username'].valid).toBeFalsy();
    });
    it('password required validity', async () => {
      const fixture = TestBed.createComponent(RegisterComponent);
      const app = fixture.debugElement.componentInstance;
      let errors = {};
      let email = app.registerGroup.controls['email'];
      errors = email.errors || {};
      expect(errors['required']).toBeTruthy();
    });
  });

  describe('RegisterForm', () => {
    let errors = {};
    let app;

    beforeEach(() => {
      const fixture = TestBed.createComponent(RegisterComponent);
      app = fixture.debugElement.componentInstance;
      errors = {};
    });

    it('should set username', async () => {
      const username = app.registerGroup.controls['username']
      username.setValue('testUsername');
      errors = username.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('should set email', async () => {
      const email = app.registerGroup.controls['email']
      email.setValue('testEmail');
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('should show that name is not required', async () => {
      expect(app.registerGroup.controls['name'].valid).toBeTruthy();
    });

    it('should set password', async () => {
      const password = app.registerGroup.controls['passwordsGroup'].controls['password'];
      password.setValue('testPassword');
      errors = password.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('should set confirmPassword', async () => {
      const confirmPassword = app.registerGroup.controls['passwordsGroup'].controls['confirmPassword'];
      confirmPassword.setValue('testPassword');
      errors = confirmPassword.errors || {};
      expect(errors['required']).toBeFalsy();
    });
  });

  describe('register()', () => {
    let errors = {};
    let app;

    beforeEach(() => {
      const fixture = TestBed.createComponent(RegisterComponent);
      app = fixture.debugElement.componentInstance;
      errors = {};
    });

    it('should set a valid form', async () => {
      spyOn(console, 'log');
      const username = app.registerGroup.controls['username']
      username.setValue('testUsername');
      const email = app.registerGroup.controls['email']
      email.setValue('testEmail');
      const password = app.registerGroup.controls['passwordsGroup'].controls['password'];
      password.setValue('testPassword');
      const confirmPassword = app.registerGroup.controls['passwordsGroup'].controls['confirmPassword'];
      confirmPassword.setValue('testPassword');
      password.setValue('testPassword');
      app.register(app.registerGroup.value, app.registerGroup.valid);
      expect(console.log).toHaveBeenCalledTimes(4);
    });
  })
});
