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
  IFormFieldRequired,
} from '../types';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

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

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.disableInput();
  }

  disableInput() {
    if (this.mode === this.formsModeEnum.PREVIEW && this.control) {
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

  onCheckboxChange(event: any) {
    console.log(event);
    const selectedValues = this.control as FormArray;
    if (event.target.checked) {
      selectedValues.push(this.formBuilder.control(event.target.value)); // Add value if checked
    } else {
      const index = selectedValues.controls.findIndex(
        (ctrl) => ctrl.value === event.target.value
      );
      if (index !== -1) {
        selectedValues.removeAt(index); // Remove value if unchecked
      }
    }
  }
}
