import {validate} from 'class-validator';
import {PaginationDTO} from './PaginationDTO';

describe('PaginationDTO', () => {
  it('testPaginationDTO', async () => {
    const dto = new PaginationDTO();
    dto.page = '1';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidPaginationDTO', async () => {
    const dto = new PaginationDTO();

    const validation1 = await validate(dto);
    expect(validation1).toHaveLength(1);
    expect(validation1[0].constraints).toMatchObject({
      isNotEmpty: 'page should not be empty',
      isNumberString: 'page must be a number string'
    });
  });
});
