import { AddressView } from './AddressView';

export class CustomerView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address?: AddressView
  ) {}
}
