import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
import { File } from 'src/Domain/File/File.entity';

@Entity()
export class PaySlip {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'timestamp', nullable: false })
  private date: string;

  @ManyToOne(type => File, { nullable: false, onDelete: 'CASCADE' })
  private file: File;

  @ManyToOne(type => User, { nullable: false, onDelete: 'CASCADE' })
  private user: User;

  constructor(date: string, file: File, user: User) {
    this.date = date;
    this.file = file;
    this.user = user;
  }

  public getId(): string {
    return this.id;
  }

  public getFile(): File {
    return this.file;
  }

  public getDate(): string {
    return this.date;
  }

  public getUser(): User {
    return this.user;
  }
}
