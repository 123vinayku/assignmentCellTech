import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [FormsComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
    SharedModule,
  ],
})
export class FormsModule {}
