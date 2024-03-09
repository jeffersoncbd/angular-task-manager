import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'task/:id',
    component: TaskComponent,
  },
];
