import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {thisExpression} from '@babel/types';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public updateName(name: string): void {
    this.name = name;
  }
}
