import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supervisor } from './supervisor.entity';
import { SupervisorsService } from './supervisors.service';
import { SupervisorsController } from './supervisors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supervisor])],
  providers: [SupervisorsService, SupervisorsService],
  controllers: [SupervisorsController],
})
export class SupervisorsModule {}
