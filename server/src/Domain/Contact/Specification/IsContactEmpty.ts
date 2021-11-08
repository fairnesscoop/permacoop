export class IsContactEmpty {
  public isSatisfiedBy(
    firstName?: string,
    lastName?: string,
    company?: string
  ): boolean {
    return !firstName && !lastName && !company;
  }
}
