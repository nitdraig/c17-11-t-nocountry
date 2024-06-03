import { PasswordService } from '@Helpers/password/password.service';
import { UserService } from '@User/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findUserByUsernameOrEmail(username);

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    if (!user.email_verified) {
      return {
        success: false,
        message: 'Email no verified',
      };
    }

    if (user.blocking) {
      return {
        success: false,
        message: 'Blocked user',
      };
    }

    const validatePass = await this.passwordService.compare(
      pass,
      user.password,
    );

    if (!validatePass) {
      return {
        success: false,
        message: 'Incorrect password',
      };
    }

    const {
      _id,
      first_name,
      last_name,
      email,
      username: userName,
      role,
      picture,
    } = user;

    return {
      success: true,
      data: {
        _id,
        first_name,
        last_name,
        email,
        username: userName,
        role,
        picture,
      },
    };
  }

  async login(
    userId: string,
    roleId: string,
    expiresIn?: string,
  ): Promise<string> {
    if (!expiresIn) expiresIn = '24h';

    const payload = {
      sub: userId,
      role: roleId,
    };

    return this.jwtService.signAsync(payload, { expiresIn });
  }
}
