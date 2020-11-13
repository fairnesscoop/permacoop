export interface ILeavePeriod {
    getStartDate(): string;
    isStartsAllDay(): boolean;
    getEndDate(): string;
    isEndsAllDay(): boolean;
}