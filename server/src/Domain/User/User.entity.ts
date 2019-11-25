import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type: 'varchar', nullable: false})
  public firstName: string;

  @Column({type: 'varchar', nullable: false})
  public lastName: string;

  @Column({type: 'varchar', unique: true, nullable: false})
  public email: string;

  @Index('api-token')
  @Column({type: 'varchar', nullable: true})
  public apiToken: string;

  @Column({type: 'varchar', nullable: false})
  public password: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
