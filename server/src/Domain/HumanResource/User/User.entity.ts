import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UserAdministrative} from './UserAdministrative.entity';

export enum UserRole {
  COOPERATOR = 'cooperator',
  EMPLOYEE = 'employee',
  ACCOUNTANT = 'accountant'
}

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

  @Column('enum', {enum: UserRole, nullable: false})
  private role: UserRole;

  @OneToOne(type => UserAdministrative, userAdministrative => userAdministrative.user, {nullable: true})
  @JoinColumn()
  public userAdministrative: UserAdministrative;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    apiToken: string,
    password: string,
    role: UserRole,
    userAdministrative?: UserAdministrative
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.apiToken = apiToken;
    this.password = password;
    this.role = role;
    this.userAdministrative = userAdministrative;
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

  public getRole(): UserRole {
    return this.role;
  }

  public isAdministrativeEditable(): boolean {
    return this.role !== UserRole.ACCOUNTANT;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getUserAdministrative(): UserAdministrative {
    return this.userAdministrative;
  }

  public update(firstName: string, lastName: string, email: string): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public updatePassword(password: string): void {
    this.password = password;
  }

  public updateRole(role: UserRole): void {
    this.role = role;
  }
}
