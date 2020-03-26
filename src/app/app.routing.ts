import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { ExpenseComponent } from './addExpense';

const appRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'expense',
      component: ExpenseComponent
    },
    
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
