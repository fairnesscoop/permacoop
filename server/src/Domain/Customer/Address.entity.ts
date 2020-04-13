import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private street: string;

  @Column({type: 'varchar', nullable: false})
  private city: string;

  @Column({type: 'varchar', length: 6, nullable: false})
  private zipCode: string;

  @Column({type: 'varchar', length: 2, nullable: false})
  private country: string;

  constructor(street: string, city: string, zipCode: string, country: string) {
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.country = country;
  }

  public getId(): string {
    return this.id;
  }

  public getStreet(): string {
    return this.street;
  }

  public getCity(): string {
    return this.city;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public getCountry(): string {
    return this.country;
  }

  public update(
    street: string,
    city: string,
    zipCode: string,
    country: string
  ): void {
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.country = country;
  }
}
