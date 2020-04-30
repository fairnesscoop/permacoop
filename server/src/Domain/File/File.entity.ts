import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private name: string;

  @Column({type: 'integer', nullable: false})
  private size: number;

  @Column({type: 'varchar', nullable: false})
  private mimeType: string;

  @Column({type: 'varchar', nullable: false})
  private password: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private uploadedAt: Date;

  constructor(name: string, size: number, mimeType: string, password: string) {
    this.name = name;
    this.size = size;
    this.mimeType = mimeType;
    this.password = password;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.size;
  }

  public getMimeType(): string {
    return this.mimeType;
  }

  public getPassword(): string {
    return this.password;
  }
}
