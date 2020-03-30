import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helper } from './helper.entity';
import { HelpersController } from './helpers.controller';
import { HelpersService } from './helpers.service';
import { Service } from '../services/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Helper, Service])],
  providers: [HelpersService],
  controllers: [HelpersController],
})
export class HelpersModule {}
