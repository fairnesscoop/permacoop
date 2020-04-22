import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Customer} from '../Customer/Customer.entity';
import {Project} from '../Project/Project.entity';
import {User} from '../User/User.entity';

@Entity()
export class Quote {
  public static readonly STATUS_DRAFT = 'draft';
  public static readonly STATUS_SENT = 'sent';
  public static readonly STATUS_REFUSED = 'refused';
  public static readonly STATUS_ACCEPTED = 'accepted';
  public static readonly STATUS_CANCELED = 'canceled';

  public static getAvailableStatus(): string[] {
    return [
      Quote.STATUS_DRAFT,
      Quote.STATUS_SENT,
      Quote.STATUS_REFUSED,
      Quote.STATUS_ACCEPTED,
      Quote.STATUS_CANCELED
    ];
  }

  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private status: string;

  @Column({type: 'varchar', nullable: false, unique: true})
  private quoteId: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  @ManyToOne(type => User, {nullable: false})
  private owner: User;

  @ManyToOne(type => Customer, {nullable: false})
  private customer: Customer;

  @ManyToOne(type => Project, {nullable: true})
  private project: Project;

  constructor(
    quoteId: string,
    status: string,
    owner: User,
    customer: Customer,
    project?: Project | null
  ) {
    this.quoteId = quoteId;
    this.status = status;
    this.owner = owner;
    this.customer = customer;
    this.project = project;
  }

  public getId(): string {
    return this.id;
  }
}
