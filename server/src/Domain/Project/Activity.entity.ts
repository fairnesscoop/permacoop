import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Project} from './Project.entity';
import {User} from '../User/User.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'integer', nullable: false})
  private time: number;

  @Column({type: 'timestamp', nullable: false})
  private date: Date;

  @Column({type: 'varchar', nullable: true})
  private summary: string;

  @ManyToOne(type => Project, {nullable: false})
  private project: Project;

  @ManyToOne(type => User, {nullable: false})
  private user: User;

  constructor(activity: Partial<Activity>) {
    Object.assign(this, activity);
  }
}
