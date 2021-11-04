import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { CreateContactAction } from './Action/CreateContactAction';
import { ContactRepository } from './Repository/ContactRepository';
import { CreateContactCommandHandler } from 'src/Application/Contact/Command/CreateContactCommandHandler';
import { GetContactsQueryHandler } from 'src/Application/Contact/Query/GetContactsQueryHandler';
import { GetContactsAction } from './Action/GetContactsAction';
import { GetContactAction } from './Action/GetContactAction';
import { GetContactByIdQueryHandler } from 'src/Application/Contact/Query/GetContactByIdQueryHandler';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Contact])],
  controllers: [CreateContactAction, GetContactsAction, GetContactAction],
  providers: [
    { provide: 'IContactRepository', useClass: ContactRepository },
    CreateContactCommandHandler,
    GetContactsQueryHandler,
    GetContactByIdQueryHandler
  ]
})
export class ContactModule {}
