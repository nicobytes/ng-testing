import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MyValidators } from './../../../utils/validators';

import { UsersService } from './../../../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterFormComponent {
  form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email],
        [MyValidators.validateEmailAsync(this.usersService)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MyValidators.validPassword,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    },
  );
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
  ) {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.status = 'loading';
      this.usersService
        .create({
          ...this.form.getRawValue(),
          role: 'customer',
        })
        .subscribe({
          next: (rta) => {
            // redirect
            // alert
            this.status = 'success';
            this.router.navigateByUrl('/login');
          },
          error: (error) => {
            // redict
            this.status = 'error';
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
