import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.css'
})
export class CustomFormComponent {
  form: FormGroup;
  submitted = false;

  departments = ['Engineering', 'Marketing', 'Finance', 'Human Resources', 'Design', 'Operations'];
  experienceLevels = ['Entry Level (0–1 yrs)', 'Junior (1–3 yrs)', 'Mid-Level (3–5 yrs)', 'Senior (5–10 yrs)', 'Lead / Manager (10+ yrs)'];
  employmentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName:       ['', [Validators.required, Validators.minLength(3)]],
      email:          ['', [Validators.required, Validators.email]],
      phone:          ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      department:     ['', Validators.required],
      position:       ['', [Validators.required, Validators.minLength(3)]],
      experienceLevel:['', Validators.required],
      employmentType: ['', Validators.required],
      expectedSalary: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      startDate:      ['', Validators.required],
      portfolio:      ['', [Validators.pattern(/^(https?:\/\/).+/)]],
      coverLetter:    ['', [Validators.required, Validators.minLength(50)]],
      agreeTerms:     [false, Validators.requiredTrue],
    });
  }

  isInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c?.touched && c?.invalid);
  }

  hasError(name: string, error: string): boolean {
    const c = this.form.get(name);
    return !!(c?.touched && c?.hasError(error));
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
