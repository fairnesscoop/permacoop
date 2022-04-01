import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../HumanResource/User/User.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  private firstName: string;

  @Column({ type: 'varchar', nullable: true })
  private lastName: string;

  @Column({ type: 'varchar', nullable: true })
  private company: string;

  @Column({ type: 'varchar', nullable: true })
  private email: string;

  @Column({ type: 'varchar', nullable: true })
  private phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  private notes: string;

  @ManyToOne(type => User, { nullable: true, onDelete: 'SET NULL' })
  private contactedBy?: User;

  constructor(
    firstName: string,
    lastName: string,
    company: string,
    email: string,
    phoneNumber: string,
    notes: string,
    contactedBy?: User
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.notes = notes;
    this.contactedBy = contactedBy;
  }

  public getId(): string | null {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getFirstName(): string | null {
    return this.firstName;
  }

  public getLastName(): string | null {
    return this.lastName;
  }

  public getCompany(): string | null {
    return this.company;
  }

  public getEmail(): string | null {
    return this.email;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getNotes(): string {
    return this.notes;
  }

  public getContactedBy(): User | null {
    return this.contactedBy;
  }

  public update(
    firstName: string,
    lastName: string,
    company: string,
    email: string,
    phoneNumber: string,
    notes: string,
    contactedBy?: User
  ): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.notes = notes;
    this.contactedBy = contactedBy;
  }
}