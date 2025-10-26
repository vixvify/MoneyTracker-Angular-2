import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Form } from './form/form';
import { Editform } from './editform/editform';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'form', component: Form },
  { path: 'editform/:name', component: Editform },
];
