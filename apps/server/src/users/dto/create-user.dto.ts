import { IsString, IsEmail, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  nationality?: string;
}