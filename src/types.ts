import type { TextFieldProps } from '@mui/material/TextField';
import { HTMLInputTypeAttribute } from 'react';

export type FormProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => any
  label?: string
  legend?: string
  fullWidth?: boolean
  action?: JSX.Element
}

export type InputModalProps = {
  type?: HTMLInputTypeAttribute,
  enabled: boolean,
  label: string,
  value: any,
  caption: string,
  onConfirm: any,
  onCancel: any,
  disabled: boolean,
  placeholder?: string
}

export type InputFieldProps<Value extends unknown> = TextFieldProps & {
  value: Value,
  match?: RegExp,
  errorText?: React.ReactNode,
  allowNull?: boolean,
  disableUnderline?: boolean,
  onSubmit(value: Value): Promise<Value>,
  transform?: (value?: any) => any,
  valid?: (value: Value) => boolean
}
