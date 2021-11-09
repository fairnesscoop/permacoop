import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { CreateContactAction } from './Action/CreateContactAction';
import { ContactRepository } from './Repository/ContactRepository';
import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';
import { CreateContactCommandHandler } from 'src/Application/Contact/Command/CreateContactCommandHandler';
import { GetContactsQueryHandler } from 'src/Application/Contact/Query/GetContactsQueryHandler';
import { GetContactsAction } from './Action/GetContactsAction';
import { GetContactAction } from './Action/GetContactAction';
import { GetContactByIdQueryHandler } from 'src/Application/Contact/Query/GetContactByIdQueryHandler';
import { DeleteContactCommandHandler } from 'src/Application/Contact/Command/DeleteContactCommandHandler';
import { DeleteContactAction } from './Action/DeleteContactAction';
import { UpdateContactAction } from './Action/UpdateContactAction';
import { UpdateContactCommandHandler } from 'src/Application/Contact/Command/UpdateContactCommandHandler';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Contact])],
  controllers: [
    CreateContactAction,
    GetContactsAction,
    GetContactAction,
    UpdateContactAction,
    DeleteContactAction
  ],
  providers: [
    { provide: 'IContactRepository', useClass: ContactRepository },
    IsContactEmpty,
    CreateContactCommandHandler,
    GetContactsQueryHandler,
    GetContactByIdQueryHandler,
    UpdateContactCommandHandler,
    DeleteContactCommandHandler
  ]
})
export class ContactModule {}
