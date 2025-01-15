import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { SitesComponent } from './components/sites/sites.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path:'',component:DashboardComponent,
    canActivate: [AuthGuard],

    children:[{
      path: 'sites',
      component: SitesComponent,
    },
    {
      path: 'add-supply',
      component: NewOrderComponent,
    }]
  }
  
];
