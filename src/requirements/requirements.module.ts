import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requirement } from './requirement.entity';
import { RequirementsController } from './requirements.controller';
import { RequirementsService } from './requirements.service';
import { Helper } from '../helpers/helper.entity';
import { Recipient } from '../recipients/recipient.entity';
import { Service } from '../services/service.entity';
import { Supervisor } from '../supervisors/supervisor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Helper, Recipient, Requirement, Service, Supervisor])],
  providers: [RequirementsService],
  controllers: [RequirementsController],
})
export class RequirementsModule {}
