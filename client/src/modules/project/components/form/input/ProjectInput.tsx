import React, {useEffect, useState} from 'react';
import {Field} from 'redux-form';
import {IProject} from '../../../models/IProject';
import {findProjects} from '../../../repositories/project';
import {useTranslation} from 'react-i18next';
import SelectInput from '../../../../core/components/form/SelectInput';

export const ProjectInput: React.FC = () => {
  const {t} = useTranslation();
  const [projects, setProjects] = useState<IProject[]>([]);

  const fetchProjects = async () => {
    setProjects(await findProjects());
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Field
      label={t('project.form.title')}
      name={'projectId'}
      component={SelectInput}
    >
      <option value={''}>{t('project.form.placeholder')}</option>
      {projects.map((project: IProject) => (
        <option key={project.id} value={project.id}>
          {project.customer?.name} {project.name}
        </option>
      ))}
    </Field>
  );
};
