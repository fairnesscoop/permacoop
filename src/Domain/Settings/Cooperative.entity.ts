import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cooperative {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 420,
    comment: 'Stored in minutes'
  })
  private dayDuration: number;

  constructor(name: string, dayDuration: number) {
    this.name = name;
    this.dayDuration = dayDuration;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDayDuration(): number {
    return this.dayDuration;
  }
}
