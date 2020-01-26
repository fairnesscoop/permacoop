import {CommandHandler} from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IActivityRepository } from 'src/Domain/Activity/Repository/IActivityRepository';
import { DeleteActivityCommand } from './DeleteActivityCommand';

@CommandHandler(DeleteActivityCommand)
export class DeleteActivityCommandHandler {
    constructor(
        @Inject('IActivityRepository')
        private readonly activityRepository: IActivityRepository
    ) {}

    public execute(command: DeleteActivityCommand): void {
        this.activityRepository.deleteById(command.activityId);
    }
}