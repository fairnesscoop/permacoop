import React from 'react';

const SelectInput: React.FC = ({
  input,
  children,
  label,
  meta: {touched, error}
}: any) => {
  const inputClass =
    touched && error ? 'form-control is-invalid' : 'form-control';

  return (
    <div className={'form-group row'}>
      <label className={'form-label'}>{label}</label>
      <select className={inputClass} {...input}>
        {children}
      </select>
      {touched && error && (
        <small className={'text-danger form-text'}>{error}</small>
      )}
    </div>
  );
};

export default SelectInput;
