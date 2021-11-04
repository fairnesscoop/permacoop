import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { CreateContactAction } from './Action/CreateContactAction';
import { ContactRepository } from './Repository/ContactRepository';
import { CreateContactCommandHandler } from 'src/Application/Contact/Command/CreateContactCommandHandler';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Contact])],
  controllers: [CreateContactAction],
  providers: [
    { provide: 'IContactRepository', useClass: ContactRepository },
    CreateContactCommandHandler
  ]
})
export class ContactModule {}
