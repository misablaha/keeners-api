import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipient } from './recipient.entity';
import { RecipientsController } from './recipients.controller';
import { RecipientsService } from './recipients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipient])],
  providers: [RecipientsService],
  controllers: [RecipientsController],
})
export class RecipientsModule {}
