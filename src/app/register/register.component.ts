import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// pg 225 Angular 2 Development with Typescript
function equalValidator({value}: FormGroup) : {[key: string]: any} {
  const [first, ...rest] = Object.keys(value || {});
  const valid = rest.every(v => value[v] === value[first]);
  return valid ? null : {equal: true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'Register';
  registerGroup: FormGroup;

  constructor(fb: FormBuilder) {
    this.registerGroup = fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'name': new FormControl(''),
      'passwordsGroup': fb.group({
        'password': new FormControl('', Validators.required),
        'confirmPassword': new FormControl(''),
      }, {validator: equalValidator})
    });
  }

  ngOnInit() {
  }

  register(formValue: any, isFormValid: boolean) {
    if(isFormValid) {
      console.log('Registering');
      console.log('Username', formValue.username);
      console.log('Email', formValue.email);
      console.log('Name', formValue.name);
    }
  }


}
