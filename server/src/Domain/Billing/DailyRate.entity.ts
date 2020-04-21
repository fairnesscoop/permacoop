import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Customer} from '../Customer/Customer.entity';
import {User} from '../User/User.entity';
import {Task} from '../Task/Task.entity';

@Entity()
export class DailyRate {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'integer', nullable: false})
  private amount: number;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  @ManyToOne(type => User, {nullable: false})
  private user: User;

  @ManyToOne(type => Customer, {nullable: false})
  private customer: Customer;

  @ManyToOne(type => Task, {nullable: false})
  private task: Task;

  constructor(amount: number, user: User, customer: Customer, task: Task) {
    this.amount = amount;
    this.user = user;
    this.customer = customer;
    this.task = task;
  }

  public getId(): string {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getUser(): User {
    return this.user;
  }

  public getTask(): Task {
    return this.task;
  }

  public getCustomer(): Customer {
    return this.customer;
  }
}
