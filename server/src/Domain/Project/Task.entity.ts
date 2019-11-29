import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type: 'varchar', nullable: false})
  public name: string;

  constructor(task: Partial<Task>) {
    Object.assign(this, task);
  }
}
