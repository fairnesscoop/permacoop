import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { CreateContactAction } from './Action/CreateContactAction';
import { ContactRepository } from './Repository/ContactRepository';
import { CreateContactCommandHandler } from 'src/Application/Contact/Command/CreateContactCommandHandler';
import { GetContactsQueryHandler } from 'src/Application/Contact/Query/GetContactsQueryHandler';
import { GetContactsAction } from './Action/GetContactsAction';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Contact])],
  controllers: [CreateContactAction, GetContactsAction],
  providers: [
    { provide: 'IContactRepository', useClass: ContactRepository },
    CreateContactCommandHandler,
    GetContactsQueryHandler
  ]
})
export class ContactModule {}
