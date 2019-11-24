export class BreadcrumbItem {
  constructor(
    public readonly title: string,
    public readonly path: string = '',
    public readonly lastItem: boolean = true
  ) {}
}
