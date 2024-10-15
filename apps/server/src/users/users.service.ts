import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import { compare } from 'bcrypt';

import { LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const emailToLowerCase = email.toLowerCase();

    const user = await this.findOneByEmail(emailToLowerCase);

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Email or password incorrect');

    const token = this.generateJwt({ id: user.id });

    return {
      user: {
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        birthDate: user.birthDate,
        nationality: user.nationality,
      },
      token,
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user)
      throw new NotFoundException(`User with email ${email} not exists`);

    return user;
  }

  private generateJwt(data: { id: string }): string {
    const token = this.jwtService.sign(data);
    return token;
  }
}
