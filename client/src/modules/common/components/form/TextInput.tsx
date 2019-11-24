import React from 'react';

const TextInput: React.FC = ({
  input,
  label,
  type,
  meta: {touched, error}
}: any) => {
  const inputClass =
    touched && error ? 'form-control is-invalid' : 'form-control';

  return (
    <div className={'form-group row'}>
      <label className={'form-label'}>{label}</label>
      <input {...input} className={inputClass} type={type} />
      {touched && error && (
        <small className={'text-danger form-text'}>{error}</small>
      )}
    </div>
  );
};

export default TextInput;
