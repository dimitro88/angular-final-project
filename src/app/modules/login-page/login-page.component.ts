import {Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {

  private sub;

  hide = true;

  public userForm: FormGroup = this.fb.group({
    login: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private notifier: NotifierService
  ) { }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

  public getErrorMessage(field) {
    return this.userForm.get(field).hasError('required') ?
      'You must enter a value' :
        this.userForm.get(field).hasError('minlength') ?
          `Must be longer than ${this.userForm.get(field).errors.minlength.requiredLength}` :
          this.userForm.get(field).hasError('maxlength') ?
            `Must be shorter than ${this.userForm.get(field).errors.maxlength.requiredLength}` : '';
  }

  submitForm() {
    this.sub = this.httpService.login(this.userForm.value)
      .subscribe(({ token }) => {
          console.log(`login token received : ${token}`);
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        },
        err => {
          this.notifier.notify('error', err.error);
      });
  }

}
