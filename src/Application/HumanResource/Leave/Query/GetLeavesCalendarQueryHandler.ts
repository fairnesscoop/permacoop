import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetLeavesCalendarQuery } from './GetLeavesCalendarQuery';
import { IDateUtils } from 'src/Application/IDateUtils';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';

@QueryHandler(GetLeavesCalendarQuery)
export class GetLeavesCalendarQueryHandler {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository
  ) {}

  async execute(query: GetLeavesCalendarQuery): Promise<string> {
    const leaveRequests = await this.leaveRequestRepository.findAcceptedLeaveRequests();

    // See: https://www.rfc-editor.org/rfc/rfc5545

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Fairness//Permacoop//FR',
      'CALSCALE:GREGORIAN',
      'X-WR-CALNAME:Congés Fairness',
      'NAME:Congés Fairness',
      'X-APPLE-CALENDAR-COLOR:#00CA9E'
    ];

    leaveRequests.forEach(leaveRequest => {
      // See https://www.rfc-editor.org/rfc/rfc5545#section-3.6.1
      // DTSTART is inclusive, and DTEND is non-inclusive.
      // But we store leave request dates as inclusive on both ends.
      const inclusiveStartDate = new Date(leaveRequest.getStartDate());
      const inclusiveEndDate = new Date(leaveRequest.getEndDate());
      const nonInclusiveEndDate = this.dateUtils.addDaysToDate(
        inclusiveEndDate,
        1
      );

      lines.push(
        'BEGIN:VEVENT',
        `UID:${leaveRequest.getId()}`,
        `DTSTART;VALUE=DATE:${this.dateUtils.format(
          inclusiveStartDate,
          'yyyyMMdd'
        )}`,
        `DTEND;VALUE=DATE:${this.dateUtils.format(
          nonInclusiveEndDate,
          'yyyyMMdd'
        )}`,
        `SUMMARY:Congés ${leaveRequest.getUser().getFullName()}`,
        'END:VEVENT'
      );
    });

    lines.push('END:VCALENDAR');

    return lines.join('\r\n');
  }
}
