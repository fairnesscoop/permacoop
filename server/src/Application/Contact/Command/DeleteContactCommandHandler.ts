import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { DeleteContactCommand } from './DeleteContactCommand';

@CommandHandler(DeleteContactCommand)
export class DeleteContactCommandHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository
  ) {}

  public async execute(command: DeleteContactCommand): Promise<void> {
    const { id } = command;

    const contact = await this.contactRepository.findOneById(id);

    if (!contact) {
      throw new ContactNotFoundException();
    }

    await this.contactRepository.remove(contact);
  }
}
