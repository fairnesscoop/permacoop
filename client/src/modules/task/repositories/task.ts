import {client as axios} from '../../../utils/axios';
import {Task} from '../models/Task';
import {TaskFormData} from '../components/form/TaskForm';
import {TaskFactory} from '../factory/TaskFactory';

export const findTasks = async (): Promise<Task[]> => {
  const response = await axios.get('tasks');
  const tasks: Task[] = [];

  for (const data of response.data) {
    tasks.push(TaskFactory.create(data));
  }

  return tasks;
};

export const findOneById = async (id: string): Promise<Task> => {
  const response = await axios.get(`tasks/${id}`);

  return TaskFactory.create(response.data);
};

export const saveTask = async (payload: TaskFormData): Promise<Task> => {
  let response;

  if (payload.id) {
    response = await axios.put(`tasks/${payload.id}`, payload);
  } else {
    response = await axios.post('tasks', payload);
  }

  return TaskFactory.create(response.data);
};
