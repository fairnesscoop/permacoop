import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: false})
  firstName: string;

  @Column({type: 'varchar', nullable: false})
  lastName: string;

  @Column({type: 'varchar', unique: true, nullable: false})
  email: string;

  @Index('api-token')
  @Column({type: 'text', nullable: true})
  apiToken: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
