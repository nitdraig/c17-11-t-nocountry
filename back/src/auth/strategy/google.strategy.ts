import { GoogleProfile } from '@Auth/interfaces/auth.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const google = configService.get('google');
    super({
      clientID: google['clientId'],
      clientSecret: google['secret'],
      callbackURL: configService.get('client_url') + '/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    // console.log(req);

    const user = {
      accessToken,
      first_name: profile._json.given_name,
      last_name: profile._json.family_name,
      picture: profile._json.picture,
      email: profile._json.email,
      email_verified: profile._json.email_verified,
      language_code: profile._json.locale,
    };

    done(null, user);
  }
}
