import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class UserStatus {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private contractType: string;

  @Column({type: 'varchar', nullable: false})
  private annualSalary: string;
}
