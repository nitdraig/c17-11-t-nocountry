import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configLoad } from './config-load';
import { envSchema } from './env-schema';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { PetModule } from './pet/pet.module';
import { CaretakerModule } from './caretaker/caretaker.module';
import { CareModule } from './care/care.module';
import { PaymentModule } from './payment/payment.module';
import { ServiceModule } from './service/service.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@Guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '@Guards/roles/roles.guard';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoad],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database_url'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PetModule,
    CaretakerModule,
    CareModule,
    PaymentModule,
    ServiceModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useExisting: RolesGuard,
    },
    RolesGuard,
  ],
})
export class AppModule {}
