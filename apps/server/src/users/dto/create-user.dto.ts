export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    password: string;
    readonly  mobileNumber: string;
    readonly birthDate: Date;
    readonly nationality: string;

}
