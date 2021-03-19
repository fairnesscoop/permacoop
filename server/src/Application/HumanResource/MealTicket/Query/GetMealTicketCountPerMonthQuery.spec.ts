import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';


import { GetMealTickerCountPerMonthQueryHandler } from './GetMealTickerCountPerMonthQueryHandler';
import { GetMealTickerCountPerMonthQuery } from './GetMealTickerCountPerMonthQuery';

describe.only('CreateMealTicketRemovalCommandHandler', () => {
    let mealTicketRemovalRepository: MealTicketRemovalRepository;
    let isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist;
    let handler: GetMealTickerCountPerMonthQueryHandler;

    const user = mock(User);

    const command = new GetMealTickerCountPerMonthQuery(
        instance(user)
    );

    beforeEach(() => {
        mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
        isMealTicketRemovalAlreadyExist = mock(IsMealTicketRemovalAlreadyExist);

        handler = new GetMealTickerCountPerMonthQueryHandler();
    });

    it('should return the MealTicket Count for each month of the current year', async () => {

        expect(await handler.execute(command)).toStrictEqual(
            [{
                '1': 2
            }]
        );
    })
});
