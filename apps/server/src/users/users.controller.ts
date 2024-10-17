import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);

  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('patch/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if(updateUserDto.password){
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
