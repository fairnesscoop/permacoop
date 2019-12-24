export class ActivityView {
  constructor(
    public readonly id: string,
    public readonly time: number,
    public readonly summary: string,
    public readonly projectName: string,
    public readonly taskName: string
  ) {}
}
