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
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit, OnChanges {
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
}
