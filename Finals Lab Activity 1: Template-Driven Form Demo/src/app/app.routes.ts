import { Routes } from '@angular/router';
import { TemplateDemoComponent } from './template-demo/template-demo.component';
import { ReactiveDemoComponent } from './reactive-demo/reactive-demo.component';
import { CustomFormComponent } from './custom-form/custom-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'template-demo', pathMatch: 'full' },
  { path: 'template-demo', component: TemplateDemoComponent },
  { path: 'reactive-demo', component: ReactiveDemoComponent },
  { path: 'custom-form', component: CustomFormComponent },
];
