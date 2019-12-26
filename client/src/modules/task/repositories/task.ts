import {client as axios} from '../../../utils/axios';
import {ITask} from '../models/ITask';
import {TaskFormData} from '../components/form/TaskForm';

export const findTasks = async (): Promise<ITask[]> => {
  const {data} = await axios.get('tasks');

  return data;
};

export const findOneById = async (id: string): Promise<ITask> => {
  const {data} = await axios.get(`tasks/${id}`);

  return data;
};

export const saveTask = async (payload: TaskFormData): Promise<ITask> => {
  let response;

  if (payload.id) {
    response = await axios.put(`tasks/${payload.id}`, payload);
  } else {
    response = await axios.post('tasks', payload);
  }

  return response.data;
};
