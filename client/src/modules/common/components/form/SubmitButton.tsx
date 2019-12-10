import React from 'react';
import {useTranslation} from 'react-i18next';

interface IProps {
  loading: boolean;
}

export const SubmitButton: React.FC<IProps> = ({loading}) => {
  const {t} = useTranslation();

  return (
    <div className={'form-group row'}>
      <button type={'submit'} className={'btn btn-primary'} disabled={loading}>
        {t('form.buttons.save')}
      </button>
    </div>
  );
};
