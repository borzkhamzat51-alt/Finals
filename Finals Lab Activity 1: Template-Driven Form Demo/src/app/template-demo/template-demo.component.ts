import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './template-demo.component.html',
  styleUrl: './template-demo.component.css'
})
export class TemplateDemoComponent {
  title = 'Template Driven Demo';
  username = '';
  email = '';
  password = '';
  role = '';
  // 3 Additional Fields
  gender = '';
  status = '';
  comments = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  resetForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = '';
    this.gender = '';
    this.status = '';
    this.comments = '';
    this.submitted = false;
  }
}
