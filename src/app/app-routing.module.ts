import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/forms.module').then((m) => m.FormsModule),
  },
  {
    path: 'form-design',
    loadChildren: () =>
      import('./form-design/form-design.module').then(
        (m) => m.FormDesignModule
      ),
  },
  {
    path: 'form-design/edit/:id',
    loadChildren: () =>
      import('./form-design/form-design.module').then(
        (m) => m.FormDesignModule
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
