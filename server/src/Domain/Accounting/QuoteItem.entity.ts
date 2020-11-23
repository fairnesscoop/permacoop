import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Quote} from './Quote.entity';

@Entity()
export class QuoteItem {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private title: string;

  @Column({type: 'integer', nullable: false})
  private quantity: number;

  @Column({type: 'integer', nullable: false})
  private dailyRate: number;

  @ManyToOne(
    type => Quote,
    quote => quote.items,
    {nullable: false, onDelete: 'CASCADE'}
  )
  quote: Quote;

  constructor(
    title: string,
    quantity: number,
    dailyRate: number,
    quote: Quote
  ) {
    this.title = title;
    this.quantity = quantity;
    this.dailyRate = dailyRate;
    this.quote = quote;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDailyRate(): number {
    return this.dailyRate;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}
