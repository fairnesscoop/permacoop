export class AuthenticatedView {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly apiToken: string
  ) {}
}
