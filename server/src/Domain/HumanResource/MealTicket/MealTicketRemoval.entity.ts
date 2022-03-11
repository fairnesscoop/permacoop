import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';

@Entity()
export class MealTicketRemoval {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'timestamp', nullable: false })
  private date: string;

  @Column({ type: 'varchar', nullable: true })
  private comment: string;

  @ManyToOne(type => User, { nullable: false, onDelete: 'CASCADE' })
  private user: User;

  constructor(date: string, user: User, comment?: string) {
    this.date = date;
    this.user = user;
    this.comment = comment;
  }

  public getId(): string {
    return this.id;
  }

  public getDate(): string {
    return this.date;
  }

  public getComment(): string {
    return this.comment;
  }

  public getUser(): User {
    return this.user;
  }
}
