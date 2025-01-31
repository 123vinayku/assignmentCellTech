import {
  FormFieldRequiredEnum,
  FormFieldsTypeEnum,
  IFormFieldRequired,
  IFormFieldType,
} from './types';

export const FormFieldTypes: Array<IFormFieldType> = [
  {
    label: 'Text',
    value: FormFieldsTypeEnum.TEXT,
  },
  {
    label: 'Radio',
    value: FormFieldsTypeEnum.RADIO,
  },
  {
    label: 'Checkbox',
    value: FormFieldsTypeEnum.CHECKBOX,
  },
];

export const FormFieldRequired: Array<IFormFieldRequired> = [
  {
    label: 'Yes',
    value: FormFieldRequiredEnum.YES,
  },
  {
    label: 'No',
    value: FormFieldRequiredEnum.NO,
  },
];
