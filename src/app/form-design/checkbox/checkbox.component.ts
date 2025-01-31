import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFieldRequired } from '../constants';
import { IFormFieldRequired } from '../types';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() field!: any;
  @Input() editIndex!: number;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  get options(): FormArray {
    return this.field.get('options') as FormArray;
  }

  public formFieldRequired: Array<IFormFieldRequired> = FormFieldRequired;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {}

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
