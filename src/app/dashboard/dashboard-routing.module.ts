import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   children: [
  //     { path: 'home', component: HomeComponent, title: 'Home' },
  //     {
  //       path: 'addProduct',
  //       component: AddProductComponent,
  //       title: 'Add Product',
  //     },
  //     { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
  //   ],
  // },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    title: 'Dashboard Home',
    children: [
      {
        path: 'addProduct',
        loadComponent: () =>
          import('./add-product/add-product.component').then(
            (c) => c.AddProductComponent
          ),
        title: 'Add Product',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
