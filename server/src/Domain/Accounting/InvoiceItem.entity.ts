import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Invoice } from './Invoice.entity';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private title: string;

  @Column({type: 'integer', nullable: false})
  private quantity: number;

  @Column({type: 'integer', nullable: false})
  private amount: number;

  @Column({type: 'integer', nullable: true, default: 0})
  private discount: number;

  @ManyToOne(
    type => Invoice,
    billing => billing.items,
    {nullable: false}
  )
  billing: Invoice;

  constructor(
    billing: Invoice,
    title: string,
    quantity: number,
    amount: number,
    discount?: number
  ) {
    this.billing = billing;
    this.title = title;
    this.quantity = quantity;
    this.amount = amount;
    this.discount = discount;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getDiscount(): number {
    return this.discount;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getInvoice(): Invoice {
    return this.billing;
  }
}
