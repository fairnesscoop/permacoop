import { IQuery } from 'src/Application/IQuery';

export class GetHolidayByIdQuery implements IQuery {
    constructor (
        public readonly id: string
    ) {}
}