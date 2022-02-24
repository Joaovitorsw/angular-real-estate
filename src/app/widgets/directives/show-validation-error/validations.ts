import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export enum eValidationErrorMessage {
  REQUIRED = 'This field <strong>is required</strong>',
  PATTERN = 'This field <strong>is invalid</strong>',
}

export enum eValidationErrorKeys {
  REQUIRED = 'required',
  PATTERN = 'pattern',
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (control && control.invalid) as boolean;
  }
}

export const VALIDATIONS = [
  {
    errorName: eValidationErrorKeys.REQUIRED,
    messageFn: () => eValidationErrorMessage.REQUIRED,
  },
  {
    errorName: eValidationErrorKeys.PATTERN,
    messageFn: () => eValidationErrorMessage.PATTERN,
  },
];
