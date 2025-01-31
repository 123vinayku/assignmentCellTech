import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDesignComponent } from './form-design.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SharedModule } from '../shared/shared.module';
import { PreviewComponent } from './preview/preview.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: FormDesignComponent,
  },
  {
    path: 'form/:id',
    component: FormComponent,
  },
  {
    path: 'form/view/:id/:responseId',
    component: FormComponent,
  },
];

@NgModule({
  declarations: [
    FormDesignComponent,
    TextInputComponent,
    RadioComponent,
    CheckboxComponent,
    PreviewComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class FormDesignModule {}
