import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormFieldRequiredEnum,
  FormFieldsTypeEnum,
  FormsModeEnum,
  IForm,
} from '../types';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit, OnChanges {
  @Input() form!: IForm;
  @Input() mode!: FormsModeEnum;

  public formPreview!: FormGroup;
  public formsModeEnum = FormsModeEnum;
  public fieldTypeEnum = FormFieldsTypeEnum;
  public formfieldRequiredEnum = FormFieldRequiredEnum;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  initForm() {
    this.formPreview = this.formBuilder.group({});
    let formJson = this.form.fields;
    for (let i = 0; i < formJson?.length; i++) {
      if (formJson[i].type === FormFieldsTypeEnum.CHECKBOX) {
        this.formPreview.addControl(
          formJson[i].key,
          new FormArray(
            [],
            formJson[i].isRequired === this.formfieldRequiredEnum.YES
              ? [Validators.required]
              : []
          )
        );
      } else {
        this.formPreview.addControl(
          formJson[i].key,
          new FormControl(
            '',
            formJson[i].isRequired === this.formfieldRequiredEnum.YES
              ? [Validators.required]
              : []
          )
        );
      }
    }
    console.log(this.formPreview, 'ppp');
  }
}
