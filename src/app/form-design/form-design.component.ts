import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldsTypeEnum, IFormFieldType } from './types';
import { FormFieldTypes } from './constants';

@Component({
  selector: 'app-form-design',
  templateUrl: './form-design.component.html',
  styleUrls: ['./form-design.component.scss'],
})
export class FormDesignComponent implements OnInit {
  public formName: string = '';
  public form!: FormGroup;
  public addFieldForm!: FormGroup;
  public formFields: Array<IFormFieldType> = FormFieldTypes;
  public fieldTypeEnum = FormFieldsTypeEnum;

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initAddFieldForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      fields: this.formBuilder.array([]),
    });
  }

  initAddFieldForm() {
    this.addFieldForm = this.formBuilder.group({
      type: ['', Validators.required],
    });
  }

  onNewField() {
    return this.formBuilder.group({
      type: [this.addFieldForm.controls['type'].value, Validators.required],
      isRequired: ['', Validators.required],
      label: ['', Validators.required],
      placeholder: [''],
      options: this.formBuilder.array([]),
    });
  }

  onAddField() {
    this.fields.push(this.onNewField());
    this.addFieldForm.reset();
    this.initAddFieldForm();
    console.log(this.form);
  }

  onDeleteField(index: number) {
    this.fields.removeAt(index);
  }

  onSubmit() {}
}
