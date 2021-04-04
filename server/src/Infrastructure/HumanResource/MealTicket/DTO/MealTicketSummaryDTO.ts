
export class MealTicketSummaryDTO {
    public total: number;
    public mealTicketRemovalCount: number
    public base: number
    public month: number
    constructor(month: number, base: number, mealTicketRemovalCount: number, total: number) {
        this.month = month;
        this.total = total;
        this.base = base;
        this.mealTicketRemovalCount = mealTicketRemovalCount
    }
}
