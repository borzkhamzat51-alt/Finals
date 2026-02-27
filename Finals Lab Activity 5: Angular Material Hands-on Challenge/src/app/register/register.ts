import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder, FormGroup, Validators, AbstractControl,
  ValidationErrors, ReactiveFormsModule
} from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

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
// ── NEW Material Components (6 added) ────────────────────────────────────────
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

// ── Custom Validators ─────────────────────────────────────────────────────────

/** Alphanumeric only, min 8 chars, must start with a letter */
function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const v: string = control.value ?? '';
  if (!v) return null;
  if (!/^[a-zA-Z]/.test(v))       return { notStartsWithLetter: true };
  if (!/^[a-zA-Z0-9]+$/.test(v))  return { notAlphanumeric: true };
  if (v.length < 8)               return { minlength: { requiredLength: 8, actualLength: v.length } };
  return null;
}

/** Accept only users born in 2006 or earlier */
function dobValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const year = new Date(control.value).getFullYear();
  return year <= 2006 ? null : { tooYoung: true };
}

// ── Component ─────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatSliderModule,
    MatSnackBarModule, MatCardModule, MatIconModule, MatTooltipModule,
    MatProgressBarModule, MatChipsModule, MatDividerModule,
    MatStepperModule, MatRadioModule, MatButtonToggleModule,
    MatAutocompleteModule, MatSlideToggleModule, MatCheckboxModule,
  ],
  templateUrl: './register.html',
  styleUrl:    './register.scss',
})
export class RegisterComponent implements OnInit {

  step1!: FormGroup;
  step2!: FormGroup;
  step3!: FormGroup;

  hidePassword  = true;
  darkMode      = true;
  submitted     = false;
  submitFlash   = false;
  focused: string | null = null;

  weightClasses = [
    'Strawweight (< 115 lbs)',
    'Flyweight (115 – 125 lbs)',
    'Bantamweight (125 – 135 lbs)',
    'Featherweight (135 – 145 lbs)',
    'Lightweight (145 – 155 lbs)',
    'Welterweight (155 – 170 lbs)',
    'Middleweight (170 – 185 lbs)',
    'Light Heavyweight (185 – 205 lbs)',
    'Heavyweight (205 – 265 lbs)',
  ];

  fightStyles = ['Boxing', 'Wrestling', 'BJJ', 'Muay Thai', 'Kickboxing', 'Judo', 'Sambo', 'MMA'];

  techniqueOptions = [
    'Takedowns', 'Ground & Pound', 'Submissions', 'Striking',
    'Clinch Work', 'Footwork', 'Counter Fighting', 'Pressure Fighting',
  ];
  selectedTechniques: string[] = [];

  countries = [
    'United States', 'Brazil', 'Russia', 'United Kingdom', 'Canada',
    'Australia', 'Ireland', 'Mexico', 'Philippines', 'Nigeria',
    'France', 'Poland', 'Georgia', 'Czech Republic', 'Netherlands',
    'Japan', 'South Korea', 'New Zealand', 'Sweden', 'Germany',
  ];
  filteredCountries!: Observable<string[]>;

  maxDob = new Date(2006, 11, 31);

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.step1 = this.fb.group({
      fighterName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email:       ['', [Validators.required, Validators.email]],
      password:    ['', [Validators.required, passwordValidator]],
      birthDate:   [null, [Validators.required, dobValidator]],
    });

    this.step2 = this.fb.group({
      weightClass: ['', Validators.required],
      fightStyle:  ['', Validators.required],
      country:     ['', Validators.required],
      gymName:     [''],
      experience:  [1],
    });

    this.step3 = this.fb.group({
      bio:        [''],
      agreeTerms: [false, Validators.requiredTrue],
    });

    this.filteredCountries = this.step2.get('country')!.valueChanges.pipe(
      startWith(''),
      map(val => this._filterCountries(val ?? ''))
    );
  }

  private _filterCountries(val: string): string[] {
    const lower = val.toLowerCase();
    return this.countries.filter(c => c.toLowerCase().includes(lower));
  }

  get formProgress(): number {
    const all = [
      ...Object.values(this.step1.controls),
      ...Object.values(this.step2.controls),
      ...Object.values(this.step3.controls),
    ];
    return Math.round((all.filter(c => c.valid).length / all.length) * 100);
  }

  get themeClass(): string {
    return this.darkMode ? 'dark-mode' : 'light-mode';
  }

  addTechnique(t: string): void {
    if (!this.selectedTechniques.includes(t))
      this.selectedTechniques = [...this.selectedTechniques, t];
  }

  removeTechnique(t: string): void {
    this.selectedTechniques = this.selectedTechniques.filter(x => x !== t);
  }

  onSubmit(): void {
    if (this.step1.valid && this.step2.valid && this.step3.valid) {
      this.submitFlash = true;
      setTimeout(() => {
        this.submitFlash = false;
        this.submitted   = true;
        console.log('Submitted:', {
          ...this.step1.value, ...this.step2.value,
          ...this.step3.value, techniques: this.selectedTechniques,
        });
        this.snackBar.open('🥊 REGISTRATION CONFIRMED — SEE YOU IN THE OCTAGON!', 'CLOSE', { duration: 4000 });
      }, 400);
    } else {
      this.step1.markAllAsTouched();
      this.step2.markAllAsTouched();
      this.step3.markAllAsTouched();
      this.snackBar.open('⚠ COMPLETE ALL REQUIRED FIELDS', 'CLOSE', { duration: 3000 });
    }
  }

  onReset(): void {
    this.step1.reset();
    this.step2.reset({ experience: 1 });
    this.step3.reset();
    this.selectedTechniques = [];
    this.submitted = false;
  }
}