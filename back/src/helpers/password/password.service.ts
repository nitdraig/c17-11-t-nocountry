import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  generateRandom(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@;.:_-/';
    const min = 8;
    const max = 16;
    let password: string = '';

    const length = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < length; i++) {
      const indexCharacter = Math.floor(Math.random() * characters.length);
      password += characters.charAt(indexCharacter);
    }

    return password;
  }
}
