export interface ICalendarOverview {
  mission: {
    days: number;
    details: {
      days: number;
      label: string;
    }[];
  };
  dojo: { days: number };
  formationConference: { days: number };
  leave: { days: number };
  support: { days: number };
  other: { days: number };
}
