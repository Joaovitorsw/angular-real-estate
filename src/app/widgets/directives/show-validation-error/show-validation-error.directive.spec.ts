import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { instance, mock, when } from 'ts-mockito';
import { eValidationErrorMessage } from '.';
import { ShowValidationErrorWidgetModule } from './show-validation-error-widget.module';

class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (control && control.invalid) as boolean;
  }
}

const CONTROL_CONTAINER_MOCK = mock(ControlContainer);
const CONTROL_CONTAINER_INSTANCE = instance(CONTROL_CONTAINER_MOCK);

const DEFAULT_PROVIDERS = [
  { provide: ControlContainer, useValue: CONTROL_CONTAINER_INSTANCE },
  { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
];

const DEFAULT_IMPORTS = [
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  ShowValidationErrorWidgetModule,
];

const getErrorMessage = () =>
  screen.getByTestId<HTMLSpanElement>('error-message');
const getMatError = () => screen.queryByTestId('mat-error');
const getInput = () => screen.getByTestId<HTMLInputElement>('form-input');

const TEST_TEMPLATE = `
  <form [formGroup]="formGroup" data-testid="form">
    <mat-form-field>
      <input
      data-testid="form-input"
      matInput
      [formControlName]="controlName"/>
      <mat-error data-testid="mat-error">
      <span  data-testid="error-message" reShowValidationError [reShowValidationErrorControlName]="controlName"></span>
      </mat-error>
    </mat-form-field>
  </form>
`;

describe('ShowValidationErrorDirective', () => {
  it('should not display any errors on the screen.', async () => {
    const testForm = new FormGroup({
      required: new FormControl(null, [Validators.required]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'required',
      },
    });

    const $input = getInput();
    userEvent.type($input, 'test');
    const $matError = getMatError();
    expect($matError).toBeNull();
  });

  it('should show the error message for the required field.', async () => {
    const testForm = new FormGroup({
      required: new FormControl(null, [Validators.required]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'required',
      },
    });

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.REQUIRED);
  });

  it('should show the error message for the pattern field.', async () => {
    const testForm = new FormGroup({
      pattern: new FormControl(null, [Validators.pattern(/^[0-9]{1,2}$/)]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'pattern',
      },
    });
    const $input = getInput();

    userEvent.type($input, '01230');

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    console.log($matError);

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.PATTERN);
  });
});
