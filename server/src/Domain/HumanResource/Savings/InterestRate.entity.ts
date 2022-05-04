import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InterestRate {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, comment: 'Stored in base 100' })
  private rate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  constructor(rate: number) {
    this.rate = rate;
  }

  public getId(): string {
    return this.id;
  }

  public getRate(): number {
    return this.rate;
  }
}
