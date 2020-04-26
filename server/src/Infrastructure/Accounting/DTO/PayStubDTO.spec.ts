import {PayStubDTO} from './PayStubDTO';
import {validate} from 'class-validator';

describe('PayStubDTO', () => {
  it('testValidDTO', async () => {
    const dto = new PayStubDTO();
    dto.date = '2020-12-17T03:24:00';
    dto.userId = '33aa85f8-52e6-44e6-9200-31dcdc038e64';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new PayStubDTO();
    dto.date = '';
    dto.userId = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isDateString: 'date must be a ISOString',
      isNotEmpty: 'date should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'userId should not be empty',
      isUuid: 'userId must be an UUID'
    });
  });
});
