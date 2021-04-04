export class WorkingDayOfYearByMonth {
    readonly month: number
    readonly workingDays: Date[]
    constructor(month: number, workedDays: Date[] = []
    ) {
        this.month = month
        this.workingDays = workedDays
    }

    addWorkingDay(date: Date) {
        this.workingDays.push(date)
    }
}
