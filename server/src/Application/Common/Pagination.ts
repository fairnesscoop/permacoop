export const MAX_ITEMS_PER_PAGE = 20;

export class Pagination<PaginationObject> {
  public readonly pageCount: number;

  constructor(
    public readonly items: PaginationObject[],
    public readonly totalItems: number
  ) {
    this.pageCount = Math.ceil(this.totalItems / MAX_ITEMS_PER_PAGE);
  }
}
