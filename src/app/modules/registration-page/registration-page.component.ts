import {Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnDestroy {

  private subscribes = [];

  hidePassword = true;
  hideConfirmPassword = true;

  public userForm: FormGroup = this.fb.group({
    login: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])],
    firstName: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      this.validateName
    ])],
    lastName: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      this.validateName
    ])],
    email: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])],
    confirmPassword: ['', Validators.compose([
      Validators.required
    ])],
  });

  private validateName(control: AbstractControl): ValidationErrors | null {
    return new RegExp(/^[A-Z]+[a-zA-Z]*$/).test(control.value) ? null : { firstUpperCaseLetter : true };
  }

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private notifier: NotifierService
  ) {
    this.subscribes
      .push(this.userForm.valueChanges
        .subscribe(({ password, confirmPassword }) => {
          if (password !== confirmPassword) {
            this.userForm
              .get('confirmPassword')
              .setErrors({ notSame: true });
          } else {
            this.userForm
              .get('confirmPassword')
              .setErrors(null);
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscribes.length && this.subscribes.forEach(sub => sub.unsubscribe());
  }

  public getErrorMessage(field) {
    return this.userForm.get(field).hasError('required') ?
      'You must enter a value' :
      this.userForm.get(field).hasError('firstUpperCaseLetter') ?
        'First letter must be Upper case!' :
        this.userForm.get(field).hasError('minlength') ?
          `Must be longer than ${this.userForm.get(field).errors.minlength.requiredLength} symbols` :
          this.userForm.get(field).hasError('pattern') ?
            'Wrong email!' :
          this.userForm.get(field).hasError('maxlength') ?
            `Must be shorter than ${this.userForm.get(field).errors.maxlength.requiredLength} symbols` :
            this.userForm.get(field).hasError('notSame') ?
              'Are not same!' : '';
  }

  submitForm() {
    this.subscribes.push(this.httpService.registration(this.userForm.value)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        err => {
          this.notifier.notify('error', err.error);
        }));
  }

}
