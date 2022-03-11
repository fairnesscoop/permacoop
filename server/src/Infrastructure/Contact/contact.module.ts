import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { CreateContactAction } from './Action/CreateContactAction';
import { ContactRepository } from './Repository/ContactRepository';
import { UserRepository } from '../HumanResource/User/Repository/UserRepository';
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
import { User } from 'src/Domain/HumanResource/User/User.entity';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Contact, User])],
  controllers: [
    CreateContactAction,
    GetContactsAction,
    GetContactAction,
    UpdateContactAction,
    DeleteContactAction
  ],
  providers: [
    { provide: 'IContactRepository', useClass: ContactRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    IsContactEmpty,
    CreateContactCommandHandler,
    GetContactsQueryHandler,
    GetContactByIdQueryHandler,
    UpdateContactCommandHandler,
    DeleteContactCommandHandler
  ]
})
export class ContactModule {}
