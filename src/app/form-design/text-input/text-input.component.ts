import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormFieldRequired } from '../types';
import { FormFieldRequired } from '../constants';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() field!: any;
  @Input() editIndex!: number;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  public formFieldRequired: Array<IFormFieldRequired> = FormFieldRequired;

  constructor() {}

  ngOnInit(): void {}
}
