
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, mobileNumber, birthDate, nationality } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      birthDate,
      nationality,
    });

    return newUser.save();
  }
  /*
 async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  */ 
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
   
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec(); 


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
