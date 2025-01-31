import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import {
  FormsModeEnum,
  FormFieldsTypeEnum,
  FormFieldRequiredEnum,
  IForm,
  FormStorageKeys,
  IResponse,
  IFormFieldOptions,
} from '../types';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  public webForm!: FormGroup;
  public formsModeEnum = FormsModeEnum;
  public fieldTypeEnum = FormFieldsTypeEnum;
  public formfieldRequiredEnum = FormFieldRequiredEnum;
  public formId!: number;
  public alive = true;
  public formDetails!: IForm;
  public responseId!: number;
  public responseDetails!: IResponse;

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
        this.responseId = Number(res.responseId ?? 0);
        this.formId = Number(res.id ?? 0);
      });
    this.getFormDetails();
    this.getResponseDetails();
    this.initForm();
  }

  getFormDetails() {
    if (this.formId) {
      const data = this.storageService.getData(FormStorageKeys.FORMS);
      this.formDetails = data.find((e: IForm) => e.id === this.formId) ?? null;
    }
  }

  getResponseDetails() {
    if (this.formId && this.responseId) {
      const data = this.storageService.getData(FormStorageKeys.RESPONSES);
      this.responseDetails =
        data.find(
          (e: IResponse) => e.formId === this.formId && e.id === this.responseId
        ) ?? null;
    }
  }

  initForm() {
    this.webForm = this.formBuilder.group({});
    let formJson = this.formDetails.fields;
    for (let i = 0; i < formJson?.length; i++) {
      if (formJson[i].type === FormFieldsTypeEnum.CHECKBOX) {
        this.webForm.addControl(
          formJson[i].key,
          new FormArray(
            [],
            formJson[i].isRequired === this.formfieldRequiredEnum.YES
              ? [this.minSelectedCheckboxes(1)]
              : []
          )
        );
        if (
          this.responseDetails &&
          this.responseDetails.formValues[formJson[i].key]?.length
        ) {
          const control = this.webForm.get(formJson[i].key) as FormArray;
          formJson[i].options.forEach((e: IFormFieldOptions) => {
            control.push(
              this.formBuilder.group({
                label: [e.label],
                value: [e.value],
                checked: [
                  this.responseDetails.formValues[formJson[i].key].indexOf(
                    e.value
                  ) > -1
                    ? true
                    : false,
                ],
              })
            );
          });
        }
      } else {
        this.webForm.addControl(
          formJson[i].key,
          new FormControl(
            this.responseDetails
              ? this.responseDetails.formValues[formJson[i].key]
              : '',
            formJson[i].isRequired === this.formfieldRequiredEnum.YES
              ? [Validators.required]
              : []
          )
        );
      }
    }
  }

  minSelectedCheckboxes(min: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (control instanceof FormArray) {
        const selectedCount = control.controls.filter(
          (c) => c.value.checked
        ).length;
        return selectedCount >= min ? null : { required: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.webForm.invalid) {
      return;
    }
    const values = JSON.parse(JSON.stringify(this.webForm.value));
    for (let key in values) {
      if (Array.isArray(values[key])) {
        values[key] = values[key]
          .filter((e: IFormFieldOptions) => e.checked)
          .map((e: IFormFieldOptions) => e.value);
      }
    }

    let previousResponse =
      this.storageService.getData(FormStorageKeys.RESPONSES) || [];

    if (previousResponse.length) {
      previousResponse = [
        ...previousResponse,
        ...[
          {
            formValues: { ...values },
            formId: this.formId,
            id: Math.floor(Math.random() * 1000),
            submittedAt: new Date().toISOString(),
          },
        ],
      ];
    } else {
      previousResponse = [
        {
          formValues: { ...values },
          formId: this.formId,
          id: Math.floor(Math.random() * 1000),
          submittedAt: new Date().toISOString(),
        },
      ];
    }

    this.storageService.setData(
      FormStorageKeys.RESPONSES,
      JSON.stringify(previousResponse)
    );
    this.router.navigate(['forms']);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
