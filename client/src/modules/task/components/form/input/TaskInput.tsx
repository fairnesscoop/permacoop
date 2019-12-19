import React, {useEffect, useState} from 'react';
import {Field} from 'redux-form';
import {Task} from '../../../models/Task';
import {findTasks} from '../../../repositories/task';
import {useTranslation} from 'react-i18next';
import SelectInput from '../../../../core/components/form/SelectInput';

export const TaskInput: React.FC = () => {
  const {t} = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    setTasks(await findTasks());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Field label={t('task.form.title')} name={'taskId'} component={SelectInput}>
      <option value={''}>{t('task.form.placeholder')}</option>
      {tasks.map((task: Task) => (
        <option key={task.id} value={task.id}>
          {task.name}
        </option>
      ))}
    </Field>
  );
};
