import { Routes } from '@angular/router';
import { TodoList_Component } from './todo-list/todo-list.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
    {path: '', component: TodoList_Component},
    {path: 'task/:id', component: TaskComponent},
    {path: 'taskEdit/:id', component : TaskComponent}
];
