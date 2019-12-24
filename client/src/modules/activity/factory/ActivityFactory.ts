import {Activity} from '../models/Activity';

export class ActivityFactory {
  public static create(payload: any): Activity {
    return new Activity(
      payload.id,
      payload.time,
      payload.summary,
      payload.projectName,
      payload.taskName
    );
  }
}
