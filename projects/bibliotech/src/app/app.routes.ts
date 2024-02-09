import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { BookListComponent } from './book/book-list.component';
import { BookReadComponent } from './book/book-read/book-read.component';
import { BookCreateComponent } from './book/book-create.component';
import { BookDeleteComponent } from './book/book-delete.component';
import { BookEditComponent } from './book/book-edit.component';
import { AuthLoginComponent } from './auth/auth-login.component';
import { UserReadComponent } from './user/user-read.component';
import { UserEditComponent } from './user/user-edit.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    {path: '', component: BookListComponent},

    //{path: 'book/:id', component: BookReadComponent, canActivate: [AuthGuard]},
    {path: 'book/:id', component: BookReadComponent},

    {path: 'book/delete/:id', component: BookDeleteComponent},

    //{path: 'add-book', component: BookCreateComponent, canActivate: [AuthGuard]},
    {path: 'add-book', component: BookCreateComponent},

    {path: 'book/edit/:id', component:BookEditComponent, canActivate: [AuthGuard]},
    {path: 'login', component:AuthLoginComponent},

    //{path: 'user/:id', component:UserReadComponent, canActivate: [AuthGuard]},
    //{path: 'user/edit/:id', component:UserEditComponent, canActivate: [AuthGuard]},
    {path: 'user/:id', component:UserReadComponent},
    {path: 'user/edit/:id', component:UserEditComponent},

    {path:'test', component: TestComponent},
];