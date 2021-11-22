import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './User.entity';

export enum ContractType {
  CDI = 'cdi',
  CDD = 'cdd',
  CTT = 'ctt',
  APPRENTICESHIP = 'apprenticeship',
  PROFESSIONALIZATION = 'professionalization'
}

export enum WorkingTimeType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time'
}

@Entity()
export class UserAdministrative {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'date', nullable: false })
  private joiningDate: string;

  @Column({ type: 'date', nullable: true })
  private leavingDate: string;

  @Column({ type: 'integer', nullable: false })
  private annualEarnings: number;

  @Column({ type: 'integer', default: 0, nullable: true })
  private transportFee: number;

  @Column({ type: 'boolean', nullable: false })
  private healthInsurance: boolean;

  @Column({ type: 'boolean', nullable: false })
  private executivePosition: boolean;

  @Column('enum', { enum: ContractType, nullable: false })
  private contract: ContractType;

  @Column('enum', { enum: WorkingTimeType, nullable: false })
  private workingTime: WorkingTimeType;

  @OneToOne(
    type => User,
    user => user.userAdministrative
  )
  public user: User;

  constructor(
    annualEarnings: number,
    healthInsurance: boolean,
    executivePosition: boolean,
    contract: ContractType,
    workingTime: WorkingTimeType,
    joiningDate: string,
    leavingDate?: string,
    transportFee?: number
  ) {
    this.annualEarnings = annualEarnings;
    this.healthInsurance = healthInsurance;
    this.executivePosition = executivePosition;
    this.contract = contract;
    this.workingTime = workingTime;
    this.joiningDate = joiningDate;
    this.leavingDate = leavingDate;
    this.transportFee = transportFee;
  }

  public getId(): string {
    return this.id;
  }

  public getJoiningDate(): string {
    return this.joiningDate;
  }

  public getLeavingDate(): string {
    return this.leavingDate;
  }

  public getAnnualEarnings(): number {
    return this.annualEarnings;
  }

  public getTransportFee(): number {
    return this.transportFee;
  }

  public haveHealthInsurance(): boolean {
    return this.healthInsurance;
  }

  public isExecutivePosition(): boolean {
    return this.executivePosition;
  }

  public getContract(): ContractType {
    return this.contract;
  }

  public getWorkingTime(): WorkingTimeType {
    return this.workingTime;
  }

  public update(
    annualEarnings: number,
    contract: ContractType,
    workingTime: WorkingTimeType,
    executivePosition: boolean,
    healthInsurance: boolean,
    joiningDate: string,
    leavingDate: string,
    transportFee: number
  ): void {
    this.annualEarnings = annualEarnings;
    this.contract = contract;
    this.workingTime = workingTime;
    this.executivePosition = executivePosition;
    this.healthInsurance = healthInsurance;
    this.joiningDate = joiningDate;
    this.leavingDate = leavingDate;
    this.transportFee = transportFee;
  }
}
