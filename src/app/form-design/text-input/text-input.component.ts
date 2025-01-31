import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormFieldRequiredEnum,
  FormsModeEnum,
  IFormFieldRequired,
} from '../types';
import { FormFieldRequired } from '../constants';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, OnChanges {
  @Input() mode!: FormsModeEnum;
  @Input() field!: any;
  @Input() editIndex!: number;
  @Input() control!: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  public formFieldRequired: Array<IFormFieldRequired> = FormFieldRequired;
  public formsModeEnum = FormsModeEnum;
  public formFieldRequiredEnum = FormFieldRequiredEnum;

  constructor() {}

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
}
