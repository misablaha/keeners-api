import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementsController } from './requirements.controller';
import { RequirementsService } from './requirements.service';
import { DemandsService } from '../demands/demands.service';
import { ClientsService } from '../clients/clients.service';
import { Requirement } from './requirement.entity';
import { Demand } from '../demands/demand.entity';
import { Helper } from '../helpers/helper.entity';
import { Client } from '../clients/client.entity';
import { Supervisor } from '../supervisors/supervisor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demand, Helper, Client, Requirement, Supervisor])],
  providers: [RequirementsService, DemandsService, ClientsService],
  controllers: [RequirementsController],
})
export class RequirementsModule {}
