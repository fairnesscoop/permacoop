import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Customer} from '../Customer/Customer.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type: 'varchar', nullable: false})
  public name: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date;

  @ManyToOne(type => Customer, {nullable: false})
  public customer: Customer;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
  }
}
