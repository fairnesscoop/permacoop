import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type: 'varchar', nullable: false})
  public name: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date;

  constructor(customer: Partial<Customer>) {
    Object.assign(this, customer);
  }
}
