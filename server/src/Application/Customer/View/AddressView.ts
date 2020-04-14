export class AddressView {
  constructor(
    public readonly id: string,
    public readonly street: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly country: string
  ) {}
}
