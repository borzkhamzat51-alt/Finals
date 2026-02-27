import { Component } from '@angular/core';
import { RegisterComponent } from './register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent],
  template: `<app-register></app-register>`
})
export class App {}