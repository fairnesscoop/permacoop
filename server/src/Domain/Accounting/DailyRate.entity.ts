import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../Customer/Customer.entity';
import { User } from '../HumanResource/User/User.entity';
import { Task } from '../Task/Task.entity';

@Entity()
export class DailyRate {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, comment: 'Stored in base 100' })
  private amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(type => User, { nullable: false, onDelete: 'CASCADE' })
  private user: User;

  @ManyToOne(type => Customer, { nullable: false, onDelete: 'CASCADE' })
  private customer: Customer;

  @ManyToOne(type => Task, { nullable: false, onDelete: 'CASCADE' })
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

  public update(
    amount: number,
    user: User,
    customer: Customer,
    task: Task
  ): void {
    this.amount = amount;
    this.user = user;
    this.customer = customer;
    this.task = task;
  }
}
