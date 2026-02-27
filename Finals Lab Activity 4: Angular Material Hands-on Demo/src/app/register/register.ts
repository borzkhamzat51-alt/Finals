import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatSliderModule,
    MatSnackBarModule, MatCardModule, MatIconModule, MatTooltipModule,
    MatProgressBarModule, MatChipsModule, MatDividerModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  hidePassword = true;
  formProgress = 0;
  submitted = false;
  submitFlash = false;
  focused: string | null = null;

  genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  skillOptions  = ['Angular', 'React', 'Vue', 'TypeScript', 'Node.js', 'Python'];
  selectedSkills: string[] = [];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username:         ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email:            ['', [Validators.required, Validators.email]],
      password:         ['', [Validators.required, Validators.minLength(8)]],
      gender:           ['', Validators.required],
      birthDate:        [null, [Validators.required, this.ageValidator]],
      address:          [''],
      angularSkillLevel:[1],
    });

    this.registrationForm.valueChanges.subscribe(() => {
      const controls = Object.values(this.registrationForm.controls);
      const filled   = controls.filter(c => c.valid).length;
      this.formProgress = Math.round((filled / controls.length) * 100);
    });
  }

  ageValidator(control: AbstractControl) {
    if (!control.value) return null;
    const age = new Date().getFullYear() - new Date(control.value).getFullYear();
    return age < 18 ? { underage: true } : null;
  }

  addSkill(skill: string) {
    if (!this.selectedSkills.includes(skill))
      this.selectedSkills = [...this.selectedSkills, skill];
  }

  removeSkill(skill: string) {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Flash effect → then show success screen
      this.submitFlash = true;
      setTimeout(() => {
        this.submitFlash = false;
        this.submitted   = true;
        console.log('Submitted:', { ...this.registrationForm.value, skills: this.selectedSkills });
        this.snackBar.open('🎉 REGISTRATION SUCCESSFUL!', 'CLOSE', { duration: 3000 });
      }, 380);
    } else {
      this.registrationForm.markAllAsTouched();
      this.snackBar.open('⚡ COMPLETE ALL REQUIRED FIELDS', 'CLOSE', { duration: 3000 });
    }
  }
}