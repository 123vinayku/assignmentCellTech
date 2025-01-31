import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDesignComponent } from './form-design.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

const routes: Routes = [
  {
    path: '',
    component: FormDesignComponent,
  },
];

@NgModule({
  declarations: [FormDesignComponent, TextInputComponent, RadioComponent, CheckboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormDesignModule {}
