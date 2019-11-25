import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private name: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  constructor(customer: Partial<Customer>) {
    Object.assign(this, customer);
  }
}
