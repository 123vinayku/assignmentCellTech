import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormFieldsTypeEnum,
  FormsModeEnum,
  FormStorageKeys,
  IForm,
  IFormFieldType,
} from './types';
import { FormFieldTypes } from './constants';
import { StorageService } from '../shared/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-form-design',
  templateUrl: './form-design.component.html',
  styleUrls: ['./form-design.component.scss'],
})
export class FormDesignComponent implements OnInit, OnDestroy {
  public formName: string = '';
  public form!: FormGroup;
  public addFieldForm!: FormGroup;
  public formFields: Array<IFormFieldType> = FormFieldTypes;
  public fieldTypeEnum = FormFieldsTypeEnum;
  public formsModeEnum = FormsModeEnum;
  public formId!: number;
  public alive = true;
  public formDetails!: IForm;

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  constructor(
    public formBuilder: FormBuilder,
    public storageService: StorageService,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(takeWhile((_) => this.alive))
      .subscribe((res: any) => {
        this.formId = Number(res.id ?? 0);
      });
    this.initForm();
    this.initAddFieldForm();
    this.getFormDetails();
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
      type: [
        this.addFieldForm.controls['type'].value ?? '',
        Validators.required,
      ],
      isRequired: ['', Validators.required],
      label: ['', Validators.required],
      placeholder: [''],
      options: this.formBuilder.array([]),
      key: [`field_${this.fields.length + 1}`, Validators.required],
    });
  }

  onAddField() {
    this.fields.push(this.onNewField());
    this.addFieldForm.reset();
    this.initAddFieldForm();
  }

  onDeleteField(index: number) {
    this.fields.removeAt(index);
  }

  getFormDetails() {
    if (this.formId) {
      const data = this.storageService.getData(FormStorageKeys.FORMS);
      this.formDetails = data.find((e: IForm) => e.id === this.formId) ?? null;
      this.patchForm();
    }
  }

  patchForm() {
    if (this.formId && this.formDetails) {
      const { name, fields } = this.formDetails;
      this.form.patchValue({ name });
      for (let i = 0; i < fields.length; i++) {
        this.fields.push(this.onNewField());
        this.fields.at(this.fields.length - 1).patchValue(fields[i]);
        if (fields[i].options.length) {
          const group = this.fields.at(this.fields.length - 1) as FormGroup;
          const options = group.get('options') as FormArray;
          for (let j = 0; j < fields[i].options.length; j++) {
            options.push(
              this.formBuilder.group({
                label: ['', Validators.required],
                value: ['', Validators.required],
              })
            );
            options.at(options.length - 1).patchValue(fields[i].options[j]);
          }
        }
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    let previousForms =
      this.storageService.getData(FormStorageKeys.FORMS) || [];

    if (previousForms.length) {
      previousForms = [
        ...previousForms,
        ...[{ ...this.form.value, id: Math.floor(Math.random() * 1000) }],
      ];
    } else {
      previousForms = [
        { ...this.form.value, id: Math.floor(Math.random() * 1000) },
      ];
    }

    this.storageService.setData(
      FormStorageKeys.FORMS,
      JSON.stringify(previousForms)
    );
    this.router.navigate(['forms']);
  }

  onUpdate() {
    if (this.form.invalid) {
      return;
    }
    let previousForms =
      this.storageService.getData(FormStorageKeys.FORMS) || [];
    const index = previousForms.findIndex((e: IForm) => e.id === this.formId);
    previousForms.splice(index, 1);
    if (previousForms.length) {
      previousForms = [
        ...previousForms,
        ...[{ ...this.form.value, id: this.formId }],
      ];
    } else {
      previousForms = [{ ...this.form.value, id: this.formId }];
    }

    this.storageService.setData(
      FormStorageKeys.FORMS,
      JSON.stringify(previousForms)
    );
    this.router.navigate(['forms']);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
