import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './reactive-demo.component.html',
  styleUrl: './reactive-demo.component.css'
})
export class ReactiveDemoComponent {
  roles = ['Admin', 'User', 'Guest'];
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]],
      role:     ['', Validators.required],
      // 3 Additional Fields
      gender:   ['', Validators.required],
      status:   ['', Validators.required],
      comments: [''],
    });
  }

  isInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!(control?.touched && control?.invalid);
  }

  hasError(name: string, error: string): boolean {
    const control = this.form.get(name);
    return !!(control?.touched && control?.hasError(error));
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.submitted = true;
      console.log(this.form.value);
    }
  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
  }
}
