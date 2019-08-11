import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { AppComponent } from './app.component';
import { CustomersGuard } from './guards/customers.guard';
import { CustomersComponent } from "./customers/customers.component";
import { CustomerExistsGuard } from "./guards/customer-exists.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers/new',
  },
  {
    path: 'customers',
    canActivate: [CustomersGuard],
    component: CustomersComponent,
    children: [
      {
        path: 'new',
        component: CustomerFormComponent
      },
      {
        path: ':id',
        canActivate: [CustomerExistsGuard],
        component: CustomerFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
