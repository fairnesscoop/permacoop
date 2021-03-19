export class AvailableMealTicketStrategy {
  public static getMealTicketCountForEachMonthOfTheYear = (mealTicketsGroupedByMonth: {
    [key: string]: Date[];
  }): { [key: string]: number } => {
    return Object.keys(mealTicketsGroupedByMonth).reduce((prev, current) => {
      const count = mealTicketsGroupedByMonth[current].length;
      return {
        ...prev,
        [current]: count
      };
    }, {});
  };
}
