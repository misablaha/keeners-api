import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandsController } from './demands.controller';
import { DemandsService } from './demands.service';
import { Service } from '../services/service.entity';
import { Demand } from './demand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demand, Service])],
  providers: [DemandsService],
  controllers: [DemandsController],
})
export class DemandsModule {}
