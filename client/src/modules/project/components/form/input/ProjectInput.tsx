import React, {useEffect, useState} from 'react';
import {Field} from 'redux-form';
import {Project} from '../../../models/Project';
import {findProjects} from '../../../repositories/project';
import {useTranslation} from 'react-i18next';
import SelectInput from '../../../../core/components/form/SelectInput';

export const ProjectInput: React.FC = () => {
  const {t} = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);

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
      <option>{t('project.form.placeholder')}</option>
      {projects.map(
        project =>
          project instanceof Project && (
            <option key={project.id} value={project.id}>
              {project.fullName}
            </option>
          )
      )}
    </Field>
  );
};
