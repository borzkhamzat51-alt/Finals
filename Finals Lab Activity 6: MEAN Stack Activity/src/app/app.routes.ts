import { Routes } from '@angular/router';
import { BattleListComponent } from './components/book-list/book-list.component';
import { BattleFormComponent } from './components/book-form/book-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'battles', pathMatch: 'full' },
  { path: 'battles', component: BattleListComponent },
  { path: 'battles/new', component: BattleFormComponent },
  { path: 'battles/edit/:id', component: BattleFormComponent },
];
