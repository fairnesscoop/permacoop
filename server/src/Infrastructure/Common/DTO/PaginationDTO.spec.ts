import {validate} from 'class-validator';
import {PaginationDTO} from './PaginationDTO';

describe('PaginationDTO', () => {
  it('testPaginationDTO', async () => {
    const dto = new PaginationDTO();
    dto.page = 1;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testMaxPaginationDTO', async () => {
    const dto = new PaginationDTO();
    dto.page = 100000;

    const validation1 = await validate(dto);
    expect(validation1).toHaveLength(1);
    expect(validation1[0].constraints).toMatchObject({
       max: 'page must not be greater than 10000'
    });
  });

  it('testInvalidPaginationDTO', async () => {
    const dto = new PaginationDTO();
    dto.page = -1;

    const validation1 = await validate(dto);
    expect(validation1).toHaveLength(1);
    expect(validation1[0].constraints).toMatchObject({
       min: 'page must not be less than 1'
    });
  });
});
