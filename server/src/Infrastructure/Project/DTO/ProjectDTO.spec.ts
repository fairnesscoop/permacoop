import { ProjectDTO } from './ProjectDTO';
import { validate } from 'class-validator';
import { InvoiceUnits } from 'src/Domain/Project/Project.entity';

describe('ProjectDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ProjectDTO();
    dto.name = 'Project';
    dto.customerId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.invoiceUnit = InvoiceUnits.DAY;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new ProjectDTO();
    dto.name = '';
    dto.customerId = '12';

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isEnum: 'invoiceUnit must be a valid enum value',
      isNotEmpty: 'invoiceUnit should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isUuid: 'customerId must be an UUID'
    });
  });
});
