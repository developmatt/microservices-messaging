import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    console.log('loginDto', loginDto);
    const user = await this.customersService.findByEmail(loginDto.username);
    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }

    const { id, password, ...payload } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
