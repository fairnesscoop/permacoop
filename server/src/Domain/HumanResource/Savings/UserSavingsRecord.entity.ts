import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { User } from '../User/User.entity';

export enum SavingsRecordType {
  INPUT = 'input',
  OUTPUT = 'output'
}

@Entity()
export class UserSavingsRecord {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, comment: 'Stored in base 100' })
  private amount: number;

  @Column('enum', { enum: SavingsRecordType, nullable: false })
  private type: SavingsRecordType;

  @ManyToOne(type => User, { nullable: false, onDelete: 'CASCADE' })
  private user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  constructor(
    amount: number,
    type: SavingsRecordType,
    user: User,
  ) {
    this.amount = amount;
    this.type = type;
    this.user = user;
  }

  public getId(): string {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getType(): SavingsRecordType {
    return this.type;
  }

  public getUser(): User {
    return this.user;
  }
}
