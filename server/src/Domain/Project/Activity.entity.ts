import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Project} from './Project.entity';
import {User} from '../User/User.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'integer', nullable: false})
  time: number;

  @Column({type: 'timestamp', nullable: false})
  date: Date;

  @Column({type: 'varchar', nullable: true})
  summary: string;

  @ManyToOne(type => Project, {nullable: false})
  project: Project;

  @ManyToOne(type => User, {nullable: false})
  user: User;

  constructor(activity: Partial<Activity>) {
    Object.assign(this, activity);
  }
}
