import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';

import { InputFieldProps } from './types';
import { useWindowDimensions } from './hooks';
import { InputModal } from './components';

export default function InputField({
  value = "",
  onSubmit: customSubmit,
  match,
  valid: errorCallbackFunction,
  errorText,
  helperText,
  transform,
  disableUnderline,
  allowNull,
  label,
  ...props
}: InputFieldProps<unknown>): JSX.Element {

  const [state, setState] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { width } = useWindowDimensions();

  const formatedDefaultValue = React.useMemo(() => {
    return props.type === 'date' && typeof value === 'string'
      ? value.substring(0, 10)
      : transform ? transform(value) : value

  }, [props.type, value])

  React.useEffect(() => {
    console.log('effect1');

    if (value && formatedDefaultValue !== state) {
      setState(formatedDefaultValue);
    }

  }, [formatedDefaultValue]);

  const error = React.useMemo(() => {
    if (typeof errorCallbackFunction === 'function') {
      return errorCallbackFunction(state) ? false : true;
    }

    return match ? !match.test(state) : errorCallbackFunction

  }, [match, state]);


  const isValid = React.useCallback(() => {
    return formatedDefaultValue !== state && (allowNull ? true : state !== '');

  }, [allowNull, state, formatedDefaultValue]);

  const handleSubmit = React.useCallback(async () => {
    if (!loading && !error && isValid()) {
      setLoading(true);
      try {
        return await Promise.resolve(customSubmit(state));
      } finally {
        return setLoading(false);
      }
    }

    return Promise.reject();
  }, [loading, state]);

  const customInputProps = {
    endAdornment: (
      <InputAdornment position="end">
        {isValid() && (
            <IconButton
              type='submit'
              size="small"
              aria-label="save changes"
            >
              <SaveIcon style={{ transition: '120ms', transform: loading ? 'scale(.75)' : '' }} />
              {loading && <CircularProgress size={34} style={{ position: 'absolute' }} />}
            </IconButton>
          )}
      </InputAdornment>),
  }

  if (disableUnderline && props.variant === 'standard') {
    customInputProps['disableUnderline'] = true;
  }

  return width >= 900 ? (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <TextField
        required={!allowNull}
        error={error}
        value={state}
        label={label}
        helperText={error ? errorText : helperText}
        onChange={(e) => transform ? setState(transform(e.target.value)) : setState(e.target.value)}
        disabled={loading}
        InputProps={customInputProps}
        {...props}
      />
    </form>
  ) : (
    <InputModal
      type={props.type}
      placeholder={props?.placeholder}
      enabled={width < 900}
      value={state}
      label={label as string}
      caption={(error ? errorText : helperText) as string}
      disabled={!isValid()}
      onCancel={() => setState(formatedDefaultValue)}
      onConfirm={handleSubmit}
    >
      <TextField
        onChange={(e) => transform ? setState(transform(e.target.value)) : setState(e.target.value)}
        {...props}
        autoFocus
        size="medium"
        variant="standard"
        value={state}
        fullWidth
        sx={{ flex: 1 }}
      />
    </InputModal>
  )
};