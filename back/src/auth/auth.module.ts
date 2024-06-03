import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@User/user.module';
import { PasswordService } from '@Helpers/password/password.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { LoginController } from './v1/login/login.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { RoleModule } from '@Role/role.module';
import { RegisterController } from './v1/register/register.controller';
import { CaretakerModule } from '@Caretaker/caretaker.module';
import { ResetPasswordController } from './v1/reset-password/reset-password.controller';
import { GetHtmlService } from '@Helpers/get-html/get-html.service';
import { MailService } from '@Helpers/mail/mail.service';

@Module({
  providers: [
    AuthService,
    PasswordService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    GetHtmlService,
    MailService,
  ],
  imports: [
    UserModule,
    RoleModule,
    CaretakerModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('jwt_secret'),
      }),
    }),
    PassportModule,
  ],
  controllers: [LoginController, RegisterController, ResetPasswordController],
})
export class AuthModule {}
