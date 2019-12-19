import {Customer} from '../../customer/models/Customer';

export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly customer?: Customer
  ) {}

  public get fullName(): string {
    return `${this?.customer?.name} > ${this.name}`;
  }
}
