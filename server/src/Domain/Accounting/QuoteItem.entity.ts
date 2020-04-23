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

  @ManyToOne(type => Quote, {nullable: false})
  private quote: Quote;

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
}
