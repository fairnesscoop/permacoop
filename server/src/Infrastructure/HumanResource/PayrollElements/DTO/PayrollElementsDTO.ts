import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PayrollElementsView } from 'src/Application/HumanResource/PayrollElements/View/PayrollElementsView';
import { IDateUtils } from 'src/Application/IDateUtils';

export interface PayrollElementsLocals {
  now: Date;
  dateUtils: IDateUtils;
  elements: PayrollElementsView[];
  formatMoney: (value: number) => string;
}
