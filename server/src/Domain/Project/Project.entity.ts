import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Customer} from '../Customer/Customer.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private name: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  @ManyToOne(type => Customer, {nullable: false})
  private customer: Customer;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
  }
}
