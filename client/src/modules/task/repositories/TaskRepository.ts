import {client as axios} from '../../../utils/axios';
import {Task} from '../models/Task';

export class TaskRepository {
  public static async findTasks(): Promise<Task[]> {
    const response = await axios.get('tasks');
    const tasks: Task[] = [];

    for (const {id, name} of response.data) {
      tasks.push(new Task(id, name));
    }

    return tasks;
  }

  public static async save(payload: Task): Promise<Task> {
    let response;

    if (payload.id) {
      response = await axios.put(`tasks/${payload.id}`, payload);
    } else {
      response = await axios.post('tasks', payload);
    }

    const {id, name} = response.data;

    return new Task(id, name);
  }
}
