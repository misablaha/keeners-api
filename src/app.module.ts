import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { HelpersModule } from './helpers/helpers.module';
import { RecipientsModule } from './recipients/recipients.module';
import { RequirementsModule } from './requirements/requirements.module';
import { ServicesModule } from './services/services.module';
import { SupervisorsModule } from './supervisors/supervisors.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    TypeOrmModule.forRoot(config().mysql),
    CoreModule,
    HelpersModule,
    RecipientsModule,
    RequirementsModule,
    ServicesModule,
    SupervisorsModule,
  ],
})
export class AppModule {}
