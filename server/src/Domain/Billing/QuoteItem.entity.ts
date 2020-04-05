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

  @Column({type: 'integer', nullable: false})
  private vat: number;

  @ManyToOne(type => Quote, {nullable: false})
  private quote: Quote;

  constructor(
    title: string,
    quantity: number,
    dailyRate: number,
    vat: number,
    quote: Quote
  ) {
    this.title = title;
    this.quantity = quantity;
    this.dailyRate = dailyRate;
    this.vat = vat;
    this.quote = quote;
  }
}
