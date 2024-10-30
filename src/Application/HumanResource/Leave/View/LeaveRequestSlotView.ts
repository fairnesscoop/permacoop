export class LeaveRequestSlotView {
  constructor(
    public readonly startDate: string,
    public readonly startsAllDay: boolean,
    public readonly endDate: string,
    public readonly endsAllDay: boolean
  ) {}
}
