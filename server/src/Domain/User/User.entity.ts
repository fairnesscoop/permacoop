import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private firstName: string;

  @Column({type: 'varchar', nullable: false})
  private lastName: string;

  @Column({type: 'varchar', unique: true, nullable: false})
  private email: string;

  @Index('api-token')
  @Column({type: 'varchar', nullable: true})
  private apiToken: string;

  @Column({type: 'varchar', nullable: false})
  private password: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
