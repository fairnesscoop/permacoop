import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private firstName: string;

  @Column({type: 'varchar', nullable: false})
  private lastName: string;

  @Column({type: 'varchar', unique: true, nullable: false})
  private email: string;

  @Index('api-token')
  @Column({type: 'varchar', nullable: true})
  private apiToken: string;

  @Column({type: 'varchar', nullable: false})
  private password: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    apiToken: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.apiToken = apiToken;
    this.password = password;
  }

  public getId(): string {
    return this.id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getApiToken(): string {
    return this.apiToken;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
