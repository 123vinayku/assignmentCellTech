export enum FormFieldsTypeEnum {
  TEXT = 'text',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export enum FormFieldRequiredEnum {
  NO = '0',
  YES = '1',
}

export interface IFormFieldType {
  label: string;
  value: FormFieldsTypeEnum;
}
export interface IFormFieldRequired {
  label: string;
  value: FormFieldRequiredEnum;
}

export interface IFormFieldOptions {
  label: string;
  value: string | boolean;
}

export interface IFormField {
  type: FormFieldsTypeEnum;
  isRequired: FormFieldRequiredEnum;
  options: Array<IFormFieldOptions>;
  label: string;
  placeholder: string;
  key: string;
}

export enum FormsModeEnum {
  EDIT = 'edit',
  PREVIEW = 'preview',
  SUBMIT = 'submit',
}

export interface IForm {
  id: number;
  name: string;
  fields: Array<IFormField>;
}

export enum FormStorageKeys {
  FORMS = 'forms',
  RESPONSES = 'responses',
}

export interface IResponse {
  id: number;
  formId: number;
  submittedAt: string;
  formValues: { [key: string]: any };
}
