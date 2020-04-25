import {FiltersDTO} from './FiltersDTO';
import {validate} from 'class-validator';

describe('FiltersDTO', () => {
  it('testValidDTO', async () => {
    const dto = new FiltersDTO();
    dto.withAccountant = 'true';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new FiltersDTO();
    dto.withAccountant = 'test';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isBooleanString: 'withAccountant must be a boolean string'
    });
  });
});
