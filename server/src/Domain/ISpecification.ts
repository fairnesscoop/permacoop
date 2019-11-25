export interface ISpecification {
  isSatisfiedBy(payload: any): Promise<boolean>;
}
