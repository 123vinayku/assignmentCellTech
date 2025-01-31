import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormFieldRequired } from '../constants';
import {
  FormFieldRequiredEnum,
  FormsModeEnum,
  IFormFieldOptions,
  IFormFieldRequired,
} from '../types';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, OnChanges {
  @Input() mode!: FormsModeEnum;
  @Input() field!: any;
  @Input() editIndex!: number;
  @Input() control!: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  get options(): FormArray {
    return this.field.get('options') as FormArray;
  }

  public formFieldRequired: Array<IFormFieldRequired> = FormFieldRequired;
  public formsModeEnum = FormsModeEnum;
  public formFieldRequiredEnum = FormFieldRequiredEnum;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.disableInput();
  }

  initializeOptions() {
    if (this.control && this.mode !== this.formsModeEnum.VIEW) {
      this.field.options.forEach((e: IFormFieldOptions) => {
        this.control.push(
          this.formBuilder.group({
            label: [e.label],
            value: [e.value],
            checked: [false],
          })
        );
      });
    }
  }

  disableInput() {
    if (
      (this.mode === this.formsModeEnum.PREVIEW ||
        this.mode === this.formsModeEnum.VIEW) &&
      this.control
    ) {
      this.control.disable();
    }
  }

  onAddOption() {
    this.options.push(
      this.formBuilder.group({
        label: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  onOptionDelete(index: number) {
    this.options.removeAt(index);
  }

  onCheckboxChange(event: any, i: number) {
    const formGroup = this.control.at(i) as FormGroup;
    formGroup.get('checked')?.setValue(event.target.checked);
    this.control.markAsTouched();
  }
}
