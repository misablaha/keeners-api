import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { CoreModule } from './core/core.module';
import { ClientsModule } from './clients/clients.module';
import { DemandsModule } from './demands/demands.module';
import { HelpersModule } from './helpers/helpers.module';
import { RequirementsModule } from './requirements/requirements.module';
import { ServicesModule } from './services/services.module';
import { SupervisorsModule } from './supervisors/supervisors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    TypeOrmModule.forRoot(config().mysql),
    CoreModule,
    ClientsModule,
    DemandsModule,
    HelpersModule,
    RequirementsModule,
    ServicesModule,
    SupervisorsModule,
  ],
})
export class AppModule {}
